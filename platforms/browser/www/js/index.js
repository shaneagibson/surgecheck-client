require.config(
  {
    baseUrl: "js",
    paths: {
      "backbone": "./components/backbone/backbone",
      "handlebars": "./components/handlebars/handlebars.min",
      "hbs-builder": "./components/requirejs-hbs/hbs-builder",
      "handlebars-compiler": "./components/requirejs-hbs/example/assets/lib/handlebars-runtime",
      "hbs": "./components/requirejs-hbs/hbs",
      "jquery": "./components/jquery/dist/jquery.min",
      "marionette": "./components/marionette/lib/backbone.marionette.min",
      "text" : "./components/requirejs-text/text",
      "underscore": "./components/underscore/underscore",
      "event-bus": "./components/vent/app/scripts/services/event-bus/event-bus",
      "mobiscroll": "./components/mobiscroll/mobiscroll.custom-2.14.4.min",
      "braintree": "./components/braintree-web/dist/braintree"
    },
    shim: {
      jquery:{
        exports: "jquery"
      },
      mobiscroll:{
        deps: ['jquery'],
        exports: "mobiscroll"
      }
    }
  }
);

function onDeviceReady() {
  require(['./app'], function(app) {
    setTimeout(function() { app.start(); }, 1000); // delay for the handle open URL function & to prevent flashing from loading screen to landing screen
  });
}

function handleOpenURL(url) {
  require(['./app'], function(app) {
    app.customUrl = url.substring('epsilon://'.length, url.length);
  });
}

document.addEventListener('deviceready', onDeviceReady, false);

window.onerror = function(error) {
  console.log('error:'+error);
  window.analytics.trackException(error, false);
};