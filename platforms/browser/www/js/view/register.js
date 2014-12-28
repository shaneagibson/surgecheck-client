define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/register');
  var click = require('../util/click');
  var vent = require('../util/vent');
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

    errors:{
      'too_short': 'Too Short',
      'too_long': 'Too Long',
      'too_weak': 'Too Weak',
      'invalid_email': 'Invalid Email',
      'invalid_mobile': 'Invalid<br/>Mobile #',
      'mandatory': 'Required',
      'already_registered' : 'Already<br/>Registered'
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
          deviceId: localStorage.getItem('deviceId'),
          firstName: this.ui.firstNameInput.val(),
          surname: this.ui.surnameInput.val(),
          emailAddress: this.ui.emailAddressInput.val(),
          mobileNumber: this.ui.mobileNumberInput.val(),
          password: this.ui.passwordInput.val()
        })
        .then(function(response) {

        })
        .catch(function(response) {
          switch (response.status) {
            case 409 : return self.addError(self.ui.emailAddressInput, 'already_registered');
          }
          toast.show()
        })
    },

    validateFirstName: function() {
      return this.validateField(this.checkName, this.ui.firstNameInput);
    },

    validateSurname: function() {
      return this.validateField(this.checkName, this.ui.surnameInput);
    },

    validateEmailAddress: function() {
      return this.validateField(this.checkEmail, this.ui.emailAddressInput);
    },

    validateMobileNumber: function() {
      return this.validateField(this.checkMobileNumber, this.ui.mobileNumberInput);
    },

    validatePassword: function() {
      return this.validateField(this.checkPassword, this.ui.passwordInput);
    },

    validateField: function(checkFunction, inputField) {
      var error = checkFunction(inputField.val());
      if (error !== undefined) {
        this.addError(inputField, error);
        return false;
      } else {
        this.removeError(inputField);
        return true;
      }
    },

    addError: function(inputField, error) {
      inputField.parent().addClass('error').find('.error-text').html(this.errors[error]);
    },

    removeError: function(inputField) {
      inputField.parent().removeClass('error').find('.error-text').html('');
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