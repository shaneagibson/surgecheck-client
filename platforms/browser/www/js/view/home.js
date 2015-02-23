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

    showPlace: function() {
      var place = context.places[view.placesIScroll.currentPage.pageX];
      vent.trigger('navigate', 'place/'+place.id);
    }

  });

  var updatePlaces = function(currentPosition) {
    return fetchPlaces(currentPosition)
      .then(function(places) {
        context.places = places;
        renderPlaces(places, currentPosition);
        renderMap(places, currentPosition);
      });
  };

  var fetchPlaces = function(currentPosition) {
    return serverGateway.places.get('/?lat='+currentPosition.coords.latitude+'&lon='+currentPosition.coords.longitude);
  };

  var renderMap = function(places, currentPosition){
    view.map = map.create($('.map-canvas .map'), onMapLoaded);
    view.map.addMarker('current_position', './images/marker.png', currentPosition.coords);
    view.map.addMarker('place', { url: './images/place-icon.png', scaledSize: new google.maps.Size(25, 34) }, places[0].coords);
    view.map.addEventListener('dragend', endMapDrag);
    view.map.fitToMarkers();
  };

  var renderPlaces = function(places) {
    places.forEach(function(place) { $('.places').append(placeTemplate(place)); });
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
        var placeIndex = this.currentPage.pageX;
        updateArrowsForSelectedPlace(placeIndex);
        view.map.addMarker('place', { url: './images/place-icon.png', scaledSize: new google.maps.Size(25, 34) }, places[placeIndex].coords);
        view.map.fitToMarkers();
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
    console.log(JSON.stringify(this.getCenter()));
  };

  var onMapLoaded = function() {
    $('.map-mask-canvas').hide();
  };

  return view;

});