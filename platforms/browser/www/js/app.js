define(function(require) {

  var pushNotification = require('./util/push-notification');
  var Router = require('./router');
  var Marionette = require('marionette');
  var Backbone = require('backbone');
  var vent = require('./util/vent');
  var serverGateway = require('../util/server-gateway');

  var app = new Marionette.Application();

  app.addInitializer(function() {
    pushNotification.register()
      .then(initializeBackbone)
      .then(resolveInitialPage)
      .then(renderInitialPage)
      .catch(handleError);
  });

  app.addRegions({
    loading: '#loading',
    main: '#main'
  });

  var renderInitialPage = function(initialPage) {
    $(app.loading.el).hide();
    setTimeout(function() {
      vent.trigger('navigate', initialPage);
    }, 500);
  };

  var resolveInitialPage = function() {
    var sessionId = localStorage.getItem('sessionid');
    var userId = localStorage.getItem('userid');
    if (sessionId && userId) {
      return serverGateway
        .get('/account/status', null, { userId: userId })
        .then(function(response) {
          if (response.verified) {
            return 'home';
          } else {
            return 'verify-mobile';
          }
        })
        .catch(function() {
          localStorage.removeItem('userid');
          localStorage.removeItem('sessionid');
          return 'sign-in';
        });
    } else {
      return new RSVP.Promise(function(resolve, reject) {
        resolve('landing');
      });
    }
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