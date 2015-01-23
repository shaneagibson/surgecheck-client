var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/',
  deps: allTestFiles,
  callback: window.__karma__.start,
  paths: {
    "jquery": "app/scripts/components/jquery/dist/jquery.min",
    "underscore": "app/scripts/components/underscore/underscore-min",
    "backbone": "app/scripts/components/backbone/backbone",
    "handlebars": "app/scripts/components/handlebars/handlebars.min",
    "hbs-builder": "app/scripts/components/requirejs-hbs/hbs-builder",
    "handlebars-compiler": "app/scripts/components/requirejs-hbs/example/assets/lib/handlebars-runtime",
    "hbs": "app/scripts/components/requirejs-hbs/hbs",
    "marionette": "app/scripts/components/marionette/lib/backbone.marionette.min",
    "text": "app/scripts/components/requirejs-text/text",
    "event-bus": "app/scripts/components/vent/app/scripts/services/event-bus/event-bus"
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      deps:["jquery"],
      exports: '_'
    },
    backbone: {
      deps:["jquery","underscore"],
      exports: 'Backbone'
    }
  }
});