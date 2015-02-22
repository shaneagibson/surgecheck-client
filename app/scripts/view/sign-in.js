define('view/sign-in', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/sign-in');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');
  var toast = require('../util/toast');
  var analytics = require('../util/analytics');
  var context = require('../context');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .sign-in' : 'signIn',
      'blur input.emailaddress' : 'validateField',
      'blur input.password' : 'validateField',
      'click .forgotten-password' : 'forgottenPassword'
    },

    ui: {
      emailAddressInput: 'input.emailaddress',
      passwordInput: 'input.password'
    },

    initialize: function() {
      analytics.trackView('Sign In');
    },

    signIn: click.single(function() {
      if (validateForm()) {
        submit(this);
      }
    }),

    validateField: function(e) {
      validator.validateFields($(e.currentTarget));
    },

    forgottenPassword: function() {
      vent.trigger('navigate', 'forgotten-password');
    }

  });

  var validateForm = function() {
    return validator.validateFields($('.form').find('.field'));
  };

  var submit = function(view) {
    return serverGateway.account.post('/account/login', {
        deviceId: localStorage.getItem('deviceid'),
        emailAddress: view.ui.emailAddressInput.val(),
        password: view.ui.passwordInput.val()
      })
      .then(function(response) {
        context.user = response.user;
        context.session = response.session;
        analytics.setUserId(response.user.id);
        localStorage.setItem('sessionid', response.session.sessionId);
        if (response.user.verified) {
          vent.trigger('navigate', 'home');
        } else {
          vent.trigger('navigate', 'verify-mobile');
        }
      })
      .catch(function(response) {
        switch (response.status) {
          case 401 : return validator.addError(view.ui.emailAddressInput, 'invalid_credentials');
          case 423 : {
            vent.trigger('navigate', 'forgotten-password');
            return toast.showLongBottom('Your account is locked. To unlock, please reset your password.');
          }
        }
        analytics.trackError(JSON.stringify(response));
        toast.showLongBottom('Something unexpected happened. Please try again.');
      });
  };

  return view;

});