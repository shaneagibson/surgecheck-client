define('view/add-venue', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/add-venue');
  var analytics = require('../util/analytics');
  var vent = require('../util/vent');
  var map = require('../util/map');
  var geolocation = require('../util/geolocation');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    initialize: function() {
      analytics.trackView('Add Venue');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'add-venue');
    },

    onDomRefresh: function(){
      geolocation.getCurrentPosition()
        .then(function(currentPosition) {
          view.map = map.create($('.map-canvas .map'), onMapLoaded);
          view.map.addMarker('place', { url: './images/place-icon.png', scaledSize: new google.maps.Size(25, 34) }, currentPosition.coords);
          view.map.addEventListener('dragstart', startMapDrag);
          view.map.addEventListener('dragend', endMapDrag);
          view.map.setCenter(currentPosition.coords);
        });
    }

  });

  var onMapLoaded = function() {
    $('.map-mask-canvas').hide();
  };

  var startMapDrag = function() {
    $('.map-canvas .crosshairs').addClass('drag');
  };

  var endMapDrag = function() {
    $('.map-canvas .crosshairs').removeClass('drag');
    var center = this.getCenter();
    var coords = { latitude: center.lat(), longitude: center.lng() };
    console.log(JSON.stringify(coords));
  };

  return view;

});