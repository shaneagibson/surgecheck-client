define(function(require) {

  var pushNotification = require('./util/push-notification');
  var Router = require('./router');
  var Marionette = require('marionette');
  var Backbone = require('backbone');
  var vent = require('./util/vent');

  var app = new Marionette.Application();

  app.addInitializer(function() {
    pushNotification.register()
      .then(initializeBackbone)
      .then(renderLandingPage)
      .catch(handleError);
  });

  app.addRegions({
    main: '#main'
  });

  var renderLandingPage = function() {
    vent.trigger('navigate', 'landing');
  };

  var initializeBackbone = function() {
    Router.initialize(app);
    Backbone.history.start();
    vent.on('navigate', function(arg) {
      Backbone.history.navigate(arg, { trigger: true });
    })
  };

  var handleError = function(error) {
    console.log(error);
  };

  return app;

});