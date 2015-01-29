define('view/reset-password', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/reset-password');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');
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

    resetPassword: click.single(function() {
      if (this.validateForm()) {
        this.submit();
      }
    }),

    validateForm: function() {
      return validator.validateFields($('.form').find('.field'));
    },

    validateField: function(e) {
      validator.validateFields($(e.currentTarget));
    },

    submit: function() {
      var self = this;
      return serverGateway
        .post('/account/password/reset', {
          userId: this.options.userId,
          token: this.options.token,
          newPassword: this.ui.passwordInput.val()
        })
        .then(function(response) {
          context.user = response.user;
          context.session = response.session;
          if (response.user.verified) {
            vent.trigger('navigate', 'home');
          } else {
            vent.trigger('navigate', 'verify-mobile');
          }
        })
        .catch(function(response) {
          switch (response.status) {
            case 409 : {
              // TODO - show link already used error
              break;
            }
            case 410 : {
              // TODO - show link expired error
              break;
            }
          }
          window.plugins.toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});