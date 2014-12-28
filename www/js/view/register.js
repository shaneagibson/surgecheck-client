define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/register');
  var click = require('../util/click');
  var vent = require('../util/vent');

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

    errors:{
      'too_short': 'Too Short',
      'too_long': 'Too Long',
      'mandatory': 'Required'
    },

    registerUser: click.single(function() {
      var hasError = this.validateForm();
        //.then(submitData)
        //.then(handleResponse);
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

    validateFirstName: function() {
      console.log('validating first name');
      return this.validateField(this.checkName, this.ui.firstNameInput);
    },

    validateSurname: function() {
      console.log('validating surname');
      return this.validateField(this.checkName, this.ui.surnameInput);
    },

    validateEmailAddress: function() {
      console.log('validating email');
      return this.validateField(this.checkEmail, this.ui.emailAddressInput);
    },

    validateMobileNumber: function() {
      console.log('validating mobile');
      return this.validateField(this.checkMobileNumber, this.ui.mobileNumberInput);
    },

    validatePassword: function() {
      console.log('validating password');
      return this.validateField(this.checkPassword, this.ui.passwordInput);
    },

    validateField: function(checkFunction, inputField) {
      var error = checkFunction(inputField.val());
      var hasError = error !== undefined;
      inputField.parent().toggleClass('error', hasError).find('.error-text').html(error ? this.errors[error] : '');
      return !hasError;
    },

    checkName: function(value) {
      if (value.trim().length === 0) {
        return 'mandatory';
      } else if (value.trim().length < 2) {
        return 'too_short';
      } else if (value.trim().length > 20) {
        return 'too_long';
      }
    },

    checkEmail: function(value) {
      // TODO - implement
    },

    checkMobileNumber: function(value) {
      // TODO - implement
    },

    checkPassword: function(value) {
      // TODO - implement
    }

  });

  return view;

});