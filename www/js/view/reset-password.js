define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/reset-password');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .reset' : 'resetPassword',
      'blur input.password' : 'validateFirstName'
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
      return this.validatePassword();
    },

    submit: function() {
      var self = this;
      return serverGateway
        .post('/account/password/reset', {
          userId: localStorage.getItem('userid'),
          password: this.ui.passwordInput.val()
        })
        .then(function(response) {
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
            }
            case 410 : {
              // TODO - show link expired error
            }
          }
          window.plugins.toast.showLongCenter('Something unexpected happened. Please try again.');
        });
    },

    validatePassword: function() {
      return validator.renderValidationResult(validator.validatePassword, this.ui.passwordInput);
    }

  });

  return view;

});