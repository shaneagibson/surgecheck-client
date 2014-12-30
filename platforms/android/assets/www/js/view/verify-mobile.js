define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/verify-mobile');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .verify' : 'verify'
    },

    ui: {
      verificationCodeInput: 'input.code'
    },

    verify: click.single(function() {
      if (this.validateForm()) {
        this.submit();
      }
    }),

    validateForm: function() {
      return this.validateVerificationCode();
    },

    submit: function() {
      var self = this;
      return serverGateway
        .post('/account/verify', {
          userId: localStorage.getItem('userid'),
          code: this.ui.verificationCodeInput.val()
        })
        .then(function() {
          vent.trigger('navigate', 'home');
        })
        .catch(function(response) {
          switch (response.status) {
            case 401 : return validator.addError(self.ui.emailAddressInput, 'invalid_verification_code');
          }
          window.plugins.toast.showLongCenter('Something unexpected happened. Please try again.');
        });
    },

    validateVerificationCode: function() {
      return validator.renderValidationResult(validator.validateVerificationCode, this.ui.verificationCodeInput);
    },

    onBack: function() {
      return false;
    }

  });

  return view;

});