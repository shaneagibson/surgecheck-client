define('view/home', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/home');
  var click = require('../util/click');
  var context = require('../context');
  var vent = require('../util/vent');
  var map = require('../util/map');
  var touch = require('../util/touch');
  var toast = require('../util/toast');
  var geolocation = require('../util/geolocation');
  var location = require('../util/location');
  var serverGateway = require('../util/server-gateway');
  var graph = require('../util/graph');
  var config = require('../config');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .book' : 'bookRide'
    },

    initialize: function() {
      var self = this;
      vent.on('screen:rotate', function() {
        issuePriceCheck({ latitude: self.coords.latitude.toFixed(2), longitude: self.coords.longitude.toFixed(2) });
      });
    },

    onClose: function() {
      vent.off('screen:rotate');
    },

    onDomRefresh: function() {
      var self = this;
      geolocation.getCurrentPosition()
        .then(function(currentPosition) {
          renderMap(currentPosition.coords);
          issuePriceCheck(currentPosition.coords);
          self.coords = currentPosition.coords;
        });
    },

    bookRide: function() {
      var center = this.map.getCenter();
      window.open('uber://?action=setPickup&&pickup[latitude]='+center.lat()+'&&pickup[longitude]='+center.lng()+'client_id='+config.uber.client_id, '_system');
    }

  });

  var issuePriceCheck = function(coords) {
    return serverGateway.pricecheck.get('/surgecheck/status', coords)
      .then(function (data) {
        renderCurrentState(data.current);
        renderGraph(data.historic);
        view.coords = coords;
      })
      .catch(renderGraph);
  };

  var renderCurrentState = function(surgeMultiplier) {
    $('.surge-title').text('Uber is Currently '+(surgeMultiplier == 1 ? 'NOT' : '')+' Surging!');
    $('.surge-multiplier').text(surgeMultiplier.toString()+'x');
  };

  var renderMap = function(coords){
    view.map = map.create($('.map-canvas .map'), onMapLoaded);
    view.map.addMarker('current_position', { url: './images/marker.png', scaledSize: new google.maps.Size(10, 10) }, coords);
    view.map.addEventListener('dragstart', startMapDrag);
    view.map.addEventListener('dragend', endMapDrag);
    view.map.setCenter(coords);
    view.map.setZoom(15);
  };

  var renderGraph = function(historicData){
    graph.destroy('.graph');
    if (historicData && historicData.length > 0) {
      $('.error').text('');
      graph.render('.graph', historicData);
    } else {
      $('.error').text('Surge Trends are Currently Unavailable at your Location');
    }
  };

  var startMapDrag = function() {
    $('.map-canvas .crosshairs').addClass('drag');
  };

  var endMapDrag = function() {
    $('.map-canvas .crosshairs').removeClass('drag');
    var center = this.getCenter();
    issuePriceCheck({ latitude: center.lat().toFixed(2), longitude: center.lng().toFixed(2) });
  };

  var onMapLoaded = function() {
    $('.map-mask-canvas').hide();
  };

  return view;

});