define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/register');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .register' : 'registerUser',
      'blur input.firstname' : 'validateFirstName',
      'blur input.surname' : 'validateSurname',
      'blur input.emailaddress' : 'validateEmailAddress',
      'blur input.mobilenumber' : 'validateMobileNumber',
      'blur input.password' : 'validatePassword'
    },

    ui: {
      firstNameInput: 'input.firstname',
      surnameInput: 'input.surname',
      emailAddressInput: 'input.emailaddress',
      mobileNumberInput: 'input.mobilenumber',
      passwordInput: 'input.password'
    },

    registerUser: click.single(function() {
      if (this.validateForm()) {
        this.submit();
      }
    }),

    validateForm: function() {
      var isValid = true;
      isValid = this.validateFirstName() && isValid;
      isValid = this.validateSurname() && isValid;
      isValid = this.validateEmailAddress() && isValid;
      isValid = this.validateMobileNumber() && isValid;
      isValid = this.validatePassword() && isValid;
      return isValid;
    },

    submit: function() {
      var self = this;
      return serverGateway
        .post('/account/register', {
          deviceId: localStorage.getItem('deviceid'),
          firstName: this.ui.firstNameInput.val(),
          surname: this.ui.surnameInput.val(),
          emailAddress: this.ui.emailAddressInput.val(),
          mobileNumber: this.ui.mobileNumberInput.val(),
          password: this.ui.passwordInput.val()
        })
        .then(function(response) {
          localStorage.setItem('sessionid', response.sessionId);
          localStorage.setItem('userid', response.userId);
          vent.trigger('navigate', 'verify-mobile');
        })
        .catch(function(response) {
          switch (response.status) {
            case 409 : return validator.addError(self.ui.emailAddressInput, 'already_registered');
          }
          window.plugins.toast.showLongCenter('Something unexpected happened. Please try again.')
        })
    },

    validateFirstName: function() {
      return validator.renderValidationResult(validator.validateName, this.ui.firstNameInput);
    },

    validateSurname: function() {
      return validator.renderValidationResult(validator.validateName, this.ui.surnameInput);
    },

    validateEmailAddress: function() {
      return validator.renderValidationResult(validator.validateEmail, this.ui.emailAddressInput);
    },

    validateMobileNumber: function() {
      return validator.renderValidationResult(validator.validateMobileNumber, this.ui.mobileNumberInput);
    },

    validatePassword: function() {
      return validator.renderValidationResult(validator.validatePassword, this.ui.passwordInput);
    }

  });

  return view;

});