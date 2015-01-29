define('view/verify-mobile', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/verify-mobile');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');
  var context = require('../context');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .verify' : 'verify',
      'click .resend-sms' : 'resendSms'
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
      return validator.validateFields($('.form').find('.field'));
    },

    submit: function() {
      var self = this;
      return serverGateway
        .post('/account/verify', {
          userId: context.user.id,
          code: this.ui.verificationCodeInput.val()
        })
        .then(function() {
          vent.trigger('navigate', 'home');
          context.user.verified = true;
        })
        .catch(function(response) {
          switch (response.status) {
            case 401 : return validator.addError(self.ui.verificationCodeInput, 'invalid_verification_code');
          }
          window.plugins.toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    },

    onBack: function() {
      return false;
    },

    resendSms: function() {
      return serverGateway
        .post('/verification-code/resend?userId='+context.user.id)
        .then(function() {
          window.plugins.toast.showLongBottom('The code has been resent via SMS.');
        })
        .catch(function(response){
          window.plugins.toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});