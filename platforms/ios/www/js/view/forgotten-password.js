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

    initialize: function() {
      analytics.trackView('Forgotten Password');
    },

    requestPasswordReset: click.single(function() {
      if (validateForm()) {
        submit(this);
      }
    }),

    validateField: function(e) {
      validator.validateFields($(e.currentTarget));
    },

    signIn: function() {
      vent.trigger('navigate', 'sign-in');
    }

  });


  var validateForm = function() {
    return validator.validateFields($('.form').find('.field'));
  };

  var submit = function(view) {
    return serverGateway.account.post('/account/password/forgotten', {
        emailAddress: view.ui.emailAddressInput.val()
      })
      .then(function() {
        toast.showLongBottom('An email has been sent to your registered email address.');
      })
      .catch(function(response) {
        analytics.trackError(JSON.stringify(response));
        toast.showLongBottom('Something unexpected happened. Please try again.');
      });
  };

  return view;

});