define('view/forgotten-password', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/forgotten-password');
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
      'click .request-reset' : 'requestPasswordReset',
      'blur input.password' : 'validateField',
      'click .sign-in' : 'signIn'
    },

    ui: {
      emailAddressInput: 'input.emailaddress'
    },

    onDomRefresh: function() {
      analytics.trackView('Forgotten Password');
    },

    requestPasswordReset: click.single(function() {
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
      return serverGateway.post('/account/password/forgotten', {
          emailAddress: this.ui.emailAddressInput.val()
        })
        .then(function() {
          toast.showLongBottom('An email has been sent to your registered email address.');
        })
        .catch(function(response) {
          analytics.trackError(JSON.stringify(response));
          toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    },

    signIn: function() {
      vent.trigger('navigate', 'sign-in');
    }

  });

  return view;

});