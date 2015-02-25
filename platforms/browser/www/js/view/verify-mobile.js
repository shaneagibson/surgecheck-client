define('view/verify-mobile', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/verify-mobile');
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
      'click .verify' : 'verify',
      'click .resend-sms' : 'resendSms'
    },

    ui: {
      verificationCodeInput: 'input.verificationcode'
    },

    initialize: function() {
      analytics.trackView('Verify Mobile');
    },

    verify: click.single(function() {
      if (validateForm()) {
        submit(this);
      }
    }),

    onBack: function() {
      return false;
    },

    resendSms: function() {
      return serverGateway.account.post('/account/user/'+context.user.id+'/verification-code/resend')
        .then(function() {
          toast.showLongBottom('The code has been resent via SMS.');
        })
        .catch(function(response){
          analytics.trackError(JSON.stringify(response));
          toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  var validateForm = function() {
    return validator.validateFields($('.form').find('.field'));
  };

  var submit = function(view) {
    return serverGateway.account.post('/account/verify', {
      userId: context.user.id,
      code: view.ui.verificationCodeInput.val()
    })
      .then(function() {
        vent.trigger('navigate', 'home');
        context.user.verified = true;
      })
      .catch(function(response) {
        switch (response.status) {
          case 401 : return validator.addError(view.ui.verificationCodeInput, 'invalid_verification_code');
        }
        analytics.trackError(JSON.stringify(response));
        toast.showLongBottom('Something unexpected happened. Please try again.');
      });
  };

  return view;

});