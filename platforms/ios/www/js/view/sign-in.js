define('view/sign-in', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/sign-in');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .sign-in' : 'signIn',
      'blur input.emailaddress' : 'validateField',
      'blur input.password' : 'validateField'
    },

    ui: {
      emailAddressInput: 'input.emailaddress',
      passwordInput: 'input.password'
    },

    signIn: click.single(function() {
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
        .post('/account/login', {
          deviceId: localStorage.getItem('deviceid'),
          emailAddress: this.ui.emailAddressInput.val(),
          password: this.ui.passwordInput.val()
        })
        .then(function(response) {
          localStorage.setItem('sessionid', response.session.sessionId);
          localStorage.setItem('userid', response.user.userId);
          if (response.user.verified) {
            vent.trigger('navigate', 'home');
          } else {
            vent.trigger('navigate', 'verify-mobile');
          }
        })
        .catch(function(response) {
          switch (response.status) {
            case 401 : return validator.addError(self.ui.emailAddressInput, 'invalid_credentials');
          }
          window.plugins.toast.showLongCenter('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});