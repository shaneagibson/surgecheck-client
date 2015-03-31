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
  var location = require('../util/location');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .tab.options' : 'showOptions',
      'click .tab.map' : 'showMap',
      'click .icon-left-dir' : 'swipeLeft',
      'click .icon-right-dir' : 'swipeRight',
      'click .place' : 'showPlace',
      'click .focus' : 'focusOnCurrentLocation',
      'click .update' : 'updatePlacesForCurrentLocation'
    },

    initialize: function() {
      analytics.trackView('Home');
    },

    onDomRefresh: function() {
      this.focusOnCurrentLocation();
    },

    close: function(){
      view.placesIScroll.destroy();
      view.placesIScroll = null;
      vent.off('places:update');
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

    focusOnCurrentLocation: function() {
      geolocation.getCurrentPosition()
        .then(function(currentPosition) {
          view.current = currentPosition.coords;
          view.center = currentPosition.coords;
          updatePlaces();
        });
    },

    updatePlacesForCurrentLocation: function() {
      updatePlaces();
    }

  });

<<<<<<< HEAD
  var fetchPlaces = function() {
    return serverGateway.place.get('/place/?latitude='+view.center.latitude+'&longitude='+view.center.longitude);
  };

  var updatePlaces = function() {
    return fetchPlaces()
      .then(function(places) {
        context.places = places;
        renderPlaces(places);
        renderMap(places);
      });
  };

  var renderPlaces = function(places) {
    $('.places').empty();
    places.forEach(function(place) { $('.places').append(placeTemplate(place)); });
    $('.places').width((places.length * 100) + 'vw');
    touch.initializeTouchFeedback();
    $('.place').click(showPlace);
    setTimeout(function() {
      view.placesIScroll = new IScroll('#places-iscroll-wrapper', {
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
        fitToBounds(view.map, view.center, places[placeIndex].coords);
      });
      updateArrowsForSelectedPlace(0);
    }, 200);
=======
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
>>>>>>> Updated surge graph to ensure line is rendered within y bounds
  };

  var renderMap = function(places){
    view.map = map.create($('.map-canvas .map'), onMapLoaded);
    view.map.addMarker('current_position', { url: './images/marker.png', scaledSize: new google.maps.Size(10, 10) }, view.current);
    view.map.addMarker('place', { url: './images/place-icon.png', scaledSize: new google.maps.Size(25, 34) }, places[0].coords);
    view.map.addEventListener('dragstart', startMapDrag);
    view.map.addEventListener('dragend', endMapDrag);
    fitToBounds(view.map, view.center, places[0].coords);
  };

  var showPlace = function() {
    var place = context.places[view.placesIScroll.currentPage.pageX];
    vent.trigger('navigate', 'place/'+place.id);
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

  var startMapDrag = function() {
    $('.map-canvas .crosshairs').addClass('drag');
  };

  var endMapDrag = function() {
    $('.map-canvas .crosshairs').removeClass('drag');
    var center = this.getCenter();
    view.center = { latitude: center.lat(), longitude: center.lng() };
  };

  var onMapLoaded = function() {
    $('.map-mask-canvas').hide();
  };

  var fitToBounds = function(map, center, place) {
    var inverse = location.getInverseCoordinate(center, place);
    map.fitToBounds([place, inverse]);
  };

  return view;

});