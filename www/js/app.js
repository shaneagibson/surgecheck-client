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
      .then(removeLoadingPage)
      .then(renderLandingPage)
      .catch(handleError);
  });

  app.addRegions({
    loading: '#loading',
    main: '#main'
  });

  var removeLoadingPage = function() {
    $(app.loading.el).hide();
  };

  var renderLandingPage = function() {
    vent.trigger('navigate', 'landing');
  };

  var initializeBackbone = function() {
    Router.initialize(app);
    Backbone.history.start();
    vent.on('navigate', function(arg) {
      Backbone.history.navigate(arg, { trigger: true });
    });
    document.addEventListener("backbutton", handleBackButton, false);
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
  };

  return app;

});