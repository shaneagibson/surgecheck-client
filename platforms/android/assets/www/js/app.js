define('app', function(require) {

  var pushNotification = require('./util/push-notification');
  var config = require('./config');
  var Router = require('./router');
  var Marionette = require('marionette');
  var Backbone = require('backbone');
  var vent = require('./util/vent');
  var touch = require('./util/touch');
  var rateme = require('./util/rateme');
  var serverGateway = require('./util/server-gateway');
  var paymentGateway = require('./util/payment-gateway');
  var mockCordova = require('./mock-cordova');
  var Menu = require('./view/menu');
  var ModalConfirm = require('./view/modal-confirm');
  var ModalRateMe = require('./view/modal-rateme');
  var ModalPhoto = require('./view/modal-photo');
  var toast = require('./util/toast');
  var analytics = require('./util/analytics');
  var context = require('./context');
  var map = require('./util/map');
  var contacts = require('./util/contacts');

  var swipe = require("jquery-touchswipe");
  var handlebarsHelpers = require("./util/hbs-helpers");

  var app = new Marionette.Application();

  app.addInitializer(function() {
    initializeForPlatform()
      .then(analytics.initialize)
      .then(pushNotification.register)
      .then(paymentGateway.initialize)
      .then(asyncFetchContacts)
      .then(initializeBackbone)
      .then(initializeGoogleMaps)
      .then(initializeModalListeners)
      .then(initializeMenu)
      .then(showRateMe)
      .then(resolveInitialPage)
      .then(renderInitialPage)
      .catch(handleError);
  });

  app.addRegions({
    loading: '#loading',
    main: '#main',
    menu: '#menu',
    modal: '#modal'
  });

  var initializeMenu = function() {
    app.menu.show(new Menu());
    vent.on('menu:show', function(activeItem) {
      app.menu.currentView.setActiveItem(activeItem);
      $('body').addClass('menu-open');
      touch.initializeTouchFeedback();
    });
    vent.on('menu:hide', function() {
      $('body').removeClass('menu-open');
    });
  };

  var asyncFetchContacts = function() {
    contacts.getAll()
      .then(function(contacts) {
        context.contacts = contacts;
      });
  };

  var initializeModalListeners = function() {
    var listeners = {
      'modal:confirm' : ModalConfirm,
      'modal:rateme' : ModalRateMe,
      'modal:photo' : ModalPhoto
    };
    var createModalListener = function(modalView) {
      return function (options) {
        $('body').addClass('modal');
        app.modal.show(new modalView(options));
        touch.initializeTouchFeedback();
        $('#mask').on('click', function() { vent.trigger('modal:hide'); });
      };
    };
    for (var key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        vent.on(key, createModalListener(listeners[key]));
      }
    }
    vent.on('modal:hide', function() {
      app.modal.empty();
      $('body').removeClass('modal');
    });
  };

  var initializeGoogleMaps = function() {
    return map.initialize();
  };

  var showRateMe = function(){
    rateme.showRateMeDialog();
  };

  var initializeForPlatform = function() {
    if (device.platform === 'browser') {
      mockCordova.mock();
    }
    $('body').addClass(device.platform.toLowerCase());
    return new RSVP.Promise(function(resolve, reject) { resolve(); });
  };

  var renderInitialPage = function(initialPage) {
    $(app.loading.el).hide();
    setTimeout(function() {
      vent.trigger('navigate', initialPage);
    }, 500);
  };

  var resolveInitialPage = function() {
    if (app.customUrl) return new RSVP.Promise(function(resolve, reject) { resolve(app.customUrl); });
    var sessionId = localStorage.getItem('sessionid');
    if (sessionId) {
      return serverGateway.account.get('/account/session', null, { sessionid: sessionId })
        .then(function(response) {
          context.user = response.user;
          context.session = response.session;
          analytics.setUserId(response.user.id);
          if (response.user.verified) {
            return 'home';
          } else {
            return 'verify-mobile';
          }
        })
        .catch(function() {
          localStorage.removeItem('sessionid');
          return 'sign-in';
        });
    } else {
      return new RSVP.Promise(function(resolve, reject) { resolve('landing'); });
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
    toast.showLongBottom('Something unexpected happened. Please try again.');
  };

  return app;

});