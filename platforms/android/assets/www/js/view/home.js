define('view/home', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/home');
  var click = require('../util/click');
  var context = require('../context');
  var analytics = require('../util/analytics');
  var vent = require('../util/vent');
  var map = require('../util/map');
  var touch = require('../util/touch');
  var geolocation = require('../util/geolocation');
  var IScroll = require('iscroll');
  var _ = require('underscore');
  var placeTemplate = require('hbs!../html/partial/place-summary');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .tab.options' : 'showOptions',
      'click .tab.map' : 'showMap',
      'click .icon-left-dir' : 'swipeLeft',
      'click .icon-right-dir' : 'swipeRight',
      'click .place' : 'showPlace'
    },

    initialize: function() {
      analytics.trackView('Home');
      geolocation.getCurrentPosition()
        .then(function(currentPosition) {
          updatePlaces(currentPosition);
        });
    },

    onClose: function(){
      view.placesIScroll.destroy();
      view.placesIScroll = null;
    },

    showMenu: function(){
      vent.trigger('menu:show', 'home');
    },

    showMap: function(){
      toggleTab($('.map-canvas'), $('.options-canvas'), $('.tab.map'));
    },

    showOptions: function(){
      toggleTab($('.options-canvas'), $('.map-canvas'), $('.tab.options'));
    },

    swipeLeft: function() {
      view.placesIScroll.prev(400);
    },

    swipeRight: function() {
      view.placesIScroll.next(400);
    },

    showPlace: function(e) {
      var placeId = $(e.currentTarget).data('id');
      vent.trigger('navigate', 'place/'+placeId);
    }

  });

  var updatePlaces = function(currentPosition){
    return fetchPlaces(currentPosition)
      .then(function(places) {
        context.places = places;
        renderMap(places, currentPosition);
        renderPlaces(places, currentPosition);
      });
  };

  var fetchPlaces = function(currentPosition) {
    return serverGateway.places.get('/?lat='+currentPosition.coords.latitude+'&lon='+currentPosition.coords.longitude);
  };

  var renderMap = function(places, currentPosition){
    var markers = [{ icon: './images/marker.png', position: currentPosition }];
    places.forEach(function(place) {
      markers.push({ icon: { url: './images/place-icon.png', scaledSize: new google.maps.Size(25, 34) }, position: place });
    });
    view.map = map.render($('.map-canvas .map'), { 'dragend': endMapDrag }, markers);
  };

  var renderPlaces = function(places, currentPosition) {
    places.forEach(function(place) {
      $('.places').append(placeTemplate(place));
    });
    touch.initializeTouchFeedback();
    setTimeout(function() {
      view.placesIScroll = new IScroll('#iscroll-wrapper', {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapSpeed: 400,
        keyBindings: true,
        eventPassthrough: false
      });
      view.placesIScroll.on('scrollEnd', function() {
        updateArrowsForSelectedPlace(this.currentPage.pageX);
        map.fit(view.map, [ { position: currentPosition }, { position: context.places[this.currentPage.pageX] } ]);
      });
      updateArrowsForSelectedPlace(0);
    }, 200);
  };

  var updateArrowsForSelectedPlace = function(placeIndex) {
    $('.icon-left-dir').toggle(placeIndex !== 0);
    $('.icon-right-dir').toggle(placeIndex !== $('.place').length - 1);
  };

  var toggleTab = function(showCanvas, hideCanvas, selectTab) {
    showCanvas.show();
    hideCanvas.hide();
    $('.tab.selected').removeClass('selected').addClass('touch-color');
    selectTab.addClass('selected').removeClass('touch-color');
    touch.removeTouchFeedback(selectTab);
    touch.initializeTouchFeedback();
  };

  var endMapDrag = function() {
    console.log(JSON.stringify(view.map.getCenter()));
  };

  return view;

});