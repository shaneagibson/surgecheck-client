define('view/register', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/register');
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
      'click .register' : 'registerUser',
      'blur input.firstname' : 'validateField',
      'blur input.surname' : 'validateField',
      'blur input.emailaddress' : 'validateField',
      'blur input.mobilenumber' : 'validateField',
      'blur input.password' : 'validateField'
    },

    ui: {
      firstNameInput: 'input.firstname',
      surnameInput: 'input.surname',
      emailAddressInput: 'input.emailaddress',
      mobileNumberInput: 'input.mobilenumber',
      passwordInput: 'input.password'
    },

    onDomRefresh: function() {
      analytics.trackView('Register');
    },

    registerUser: click.single(function() {
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
      return serverGateway.post('/account/register', {
          deviceId: localStorage.getItem('deviceid'),
          firstName: this.ui.firstNameInput.val(),
          surname: this.ui.surnameInput.val(),
          emailAddress: this.ui.emailAddressInput.val(),
          mobileNumber: this.ui.mobileNumberInput.val(),
          password: this.ui.passwordInput.val()
        })
        .then(function(response) {
          context.user = response.user;
          context.session = response.session;
          analytics.setUserId(response.user.id);
          localStorage.setItem('sessionid', response.session.sessionId);
          vent.trigger('navigate', 'verify-mobile');
        })
        .catch(function(response) {
          switch (response.status) {
            case 409 : return validator.addError(self.ui.emailAddressInput, 'already_registered');
          }
          analytics.trackError(JSON.stringify(response));
          toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});