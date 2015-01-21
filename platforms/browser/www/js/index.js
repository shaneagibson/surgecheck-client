function onDeviceReady() {

  require.config(
    {
      baseUrl: "js",
      paths: {
        "backbone": "./components/backbone/backbone",
        "handlebars": "./components/handlebars/handlebars.min",
        "hbs": "./components/requirejs-hbs/hbs",
        "jquery": "./components/jquery/dist/jquery.min",
        "marionette": "./components/marionette/lib/backbone.marionette.min",
        "text" : "./components/requirejs-text/text",
        "underscore": "./components/underscore/underscore-min",
        "event-bus": "./components/vent/app/scripts/services/event-bus/event-bus"
      }
    }
  );

  require(['./app'], function(app) {
    'use strict';
    setTimeout(function() { app.start(); }, 1000); // delay for the handle open URL function & to prevent flashing from loading screen to landing screen
  });

}

document.addEventListener('deviceready', onDeviceReady, false);

window.onerror = function(error) {
  console.log('error:'+error);
};

function handleOpenURL(url) {
  require(['./app'], function(app) {
    app.customUrl = url.substring('epsilon://'.length, url.length);
  });
}