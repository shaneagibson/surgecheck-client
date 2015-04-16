define('app', function(require) {

  var config = require('./config');
  var Router = require('./router');
  var Marionette = require('marionette');
  var Backbone = require('backbone');
  var vent = require('./util/vent');
  var geolocation = require('./util/geolocation');
  var touch = require('./util/touch');
  var mockCordova = require('./mock-cordova');
  var toast = require('./util/toast');
  var context = require('./context');
  var map = require('./util/map');

  var app = new Marionette.Application();

  app.addInitializer(function() {
    initializeForPlatform()
      .then(initializeOrientationListener)
      .then(initializeBackbone)
      .then(initializeGoogleMaps)
      .then(initializeGeolocation)
      .then(renderHome)
      .catch(handleError);
  });

  app.addRegions({
    loading: '#loading',
    main: '#main'
  });

  var initializeGeolocation = function() {
    return geolocation.getCurrentPosition();
  };

  var initializeGoogleMaps = function() {
    return map.initialize();
  };

  var initializeForPlatform = function() {
    if (device.platform === 'browser') {
      mockCordova.mock();
    }
    $('body').addClass(device.platform.toLowerCase());
    return new RSVP.Promise(function(resolve, reject) { resolve(); });
  };

  var renderHome = function() {
    $(app.loading.el).hide();
    setTimeout(function() {
      vent.trigger('navigate', 'home');
    }, 500);
  };

  var initializeBackbone = function() {
    Router.initialize(app);
    Backbone.history.start();
    vent.on('navigate', function(arg) {
      Backbone.history.navigate(arg, { trigger: true });
    });
    document.addEventListener("backbutton", handleBackButton, false);
  };

  var initializeOrientationListener = function() {
    function onOrientationChange() {
      switch(window.orientation) {
        case -90:
        case 90:
          vent.trigger('screen:rotate', 'landscape');
          break;
        default:
          vent.trigger('screen:rotate', 'portrait');
          break;
      }
    }
    window.addEventListener('orientationchange', onOrientationChange);
  };

  var handleBackButton = function() {
    if (app.main.currentView.onBack) {
      app.main.currentView.onBack();
    } else {
      Backbone.history.history.back();
    }
  };

  var handleError = function(error) {
    console.log(error);
    toast.showLongBottom('Something unexpected happened. Please ensure Location Services and WiFi are enabled and try again.');
  };

  return app;

});