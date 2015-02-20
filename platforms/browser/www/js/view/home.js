define('view/home', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/home');
  var click = require('../util/click');
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
      'click .image' : 'toggleImage',
      'click .icon-left-dir' : 'swipeLeft',
      'click .icon-right-dir' : 'swipeRight'
    },

    onDomRefresh: function() {
      var self = this;
      _.bindAll(this, 'renderPlaces', 'renderMap', 'startMapDrag', 'endMapDrag');
      analytics.trackView('Home');
      geolocation.getCurrentPosition()
        .then(function(currentPosition){
          return self.fetchPlaces(currentPosition)
            .then(function(places) {
              self.renderMap(places, currentPosition);
              self.renderPlaces(places);
            });
        });
    },

    onClose: function(){
      this.placesIScroll.destroy();
      this.placesIScroll = null;
    },

    fetchPlaces: function(currentPosition) {
      return serverGateway.places.get('/?lat='+currentPosition.coords.latitude+'&lon='+currentPosition.coords.longitude);
    },

    renderMap: function(places, currentPosition){
      var self = this;
      var markers = [{ icon: './images/marker.png', position: currentPosition }];
      places.forEach(function(place) {
        markers.push({ icon: { url: './images/place-icon.png', scaledSize: new google.maps.Size(25, 34) }, position: place });
      });
      self.map = map.render($('.map-canvas .map'), currentPosition, 17, { 'dragstart': self.startMapDrag, 'dragend': self.endMapDrag }, markers);
    },

    renderPlaces: function(places) {
      var self = this;
      places.forEach(function(place) {
        $('.places').append(placeTemplate(place));
      });
      touch.initializeTouchFeedback();
      setTimeout(function() {
        self.placesIScroll = new IScroll('#iscroll-wrapper', {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapSpeed: 400,
          keyBindings: true
        });
        self.placesIScroll.on('scrollEnd', function() { self.updateArrowsForSelectedPlace(this.currentPage.pageX); });
        self.updateArrowsForSelectedPlace(0);
      }, 200);
    },

    showMenu: function(){
      vent.trigger('menu:show', 'home');
    },

    showMap: function(){
      this.toggleTab($('.map-canvas'), $('.options-canvas'), $('.tab.map'));
    },

    showOptions: function(){
      this.toggleTab($('.options-canvas'), $('.map-canvas'), $('.tab.options'));
    },

    toggleTab: function(showCanvas, hideCanvas, selectTab) {
      showCanvas.show();
      hideCanvas.hide();
      $('.tab.selected').removeClass('selected').addClass('touch-color');
      selectTab.addClass('selected').removeClass('touch-color');
      touch.initializeTouchFeedback();
    },

    startMapDrag: function() {
      $('.map-canvas .icon-target').addClass('drag');
    },

    endMapDrag: function() {
      $('.map-canvas .icon-target').removeClass('drag');
      console.log(JSON.stringify(this.map.getCenter()));
    },

    toggleImage: function(e) {
      // TODO
    },

    swipeLeft: function() {
      this.placesIScroll.prev(400);
    },

    swipeRight: function() {
      this.placesIScroll.next(400);
    },

    updateArrowsForSelectedPlace: function(placeIndex) {
      $('.icon-left-dir').toggle(placeIndex !== 0);
      $('.icon-right-dir').toggle(placeIndex !== $('.place').length - 1);
    }

  });

  return view;

});