define('view/reset-password', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/reset-password');
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
      'click .reset' : 'resetPassword',
      'blur input.password' : 'validateField'
    },

    ui: {
      passwordInput: 'input.password'
    },

    initialize: function() {
      analytics.trackView('Reset Password');
    },

    resetPassword: click.single(function() {
      if (validateForm()) {
        submit(this);
      }
    }),

    validateField: function(e) {
      validator.validateFields($(e.currentTarget));
    }

  });

  var validateForm = function() {
    return validator.validateFields($('.form').find('.field'));
  };

  var submit = function(view) {
    return serverGateway.account.post('/account/password/reset', {
        userId: view.options.userId,
        token: view.options.token,
        newPassword: view.ui.passwordInput.val()
      })
      .then(function (response) {
        context.user = response.user;
        context.session = response.session;
        analytics.setUserId(response.user.id);
        if (response.user.verified) {
          vent.trigger('navigate', 'home');
        } else {
          vent.trigger('navigate', 'verify-mobile');
        }
      })
      .catch(function (response) {
        switch (response.status) {
          case 409 :
          {
            vent.trigger('navigate', 'forgotten-password');
            return toast.showLongBottom('Reset Password Link has already been used.');
          }
          case 410 :
          {
            vent.trigger('navigate', 'forgotten-password');
            return toast.showLongBottom('Reset Password Link has expired.');
          }
        }
        analytics.trackError(JSON.stringify(response));
        toast.showLongBottom('Something unexpected happened. Please try again.');
      });
  };

  return view;

});