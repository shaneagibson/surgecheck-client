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
      'click .request-reset' : 'requestPasswordReset',
      'blur input.password' : 'validateField'
    },

    ui: {
      emailAddressInput: 'input.emailaddress'
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
      validator.validateFields([ e.srcElement ]);
    },

    submit: function() {
      var self = this;
      return serverGateway
        .post('/account/password/forgotten', {
          emailAddress: this.ui.emailAddressInput.val()
        })
        .then(function(response) {
          // TODO - show email sent notification
        })
        .catch(function(response) {
          window.plugins.toast.showLongCenter('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});