define('util/validator', function(require) {

  var nameValidator = require('util/validation/name-validator');

  var exports = {

    validateFields: function(inputFields) {
      var self = this;
      var errors = inputFields.filter(function() {
        return !self.validateField($(this));
      });
      return errors.length === 0;
    },

    validateField: function(inputField) {
      var self = this;
      var rules = inputField.data('validationrules').split(' ');
      var errors = rules.map(function(rule) {
        if (validators[rule]) {
          return validators[rule](inputField.val());
        }
      }).filter(function(error) {
        return error;
      });
      if (errors.length > 0) {
        self.addError(inputField, errors[0]);
      } else {
        self.removeError(inputField);
      }
      return errors.length === 0;
    },

    addError: function(inputField, error) {
      inputField.parent().addClass('error').find('.error-text').html(ErrorMessages[error]);
    },

    removeError: function(inputField) {
      inputField.parent().removeClass('error').find('.error-text').html('');
    }

  };

  var validateEmail = function(value) {
    var emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!emailRegEx.test(value)) {
      return 'invalid_email';
    }
  };

  var validateMobileNumber = function(value) {
    var mobileNumberRegEx = /((7|447|07)\d{9}$)/;
    if (!mobileNumberRegEx.test(value)) {
      return 'invalid_mobile';
    }
  };

  var validateMandatoryField = function(value) {
    if (value.trim().length === 0) {
      return 'mandatory';
    }
  };

  var validatePassword = function(value) {
    var containAlphaChars = /[a-z]/i.test(value);
    var containNumericChars = /[0-9]/g.test(value);
    var containsUpperCaseChars = /[A-Z]/.test(value);
    var containsLowerCaseChars = /[a-z]/.test(value);
    if (!(containAlphaChars && containNumericChars && containsUpperCaseChars && containsLowerCaseChars)) {
      return 'too_weak';
    }
  };

  var validateVerificationCode = function(value) {
    if (!/^\d{3}$/.test(value)) {
      return 'invalid_verification_code';
    }
  };

  // TODO - move each field validator into separate JS file

  var validators = {
    'mandatory' : validateMandatoryField,
    'password': validatePassword,
    'emailaddress' : validateEmail,
    'mobilenumber' : validateMobileNumber,
    'name' : nameValidator.validate,
    'verificationcode' : validateVerificationCode
  };

  var ErrorMessages = {
    'too_short': 'Too Short',
    'too_long': 'Too Long',
    'too_weak': 'Too Weak',
    'invalid_email': 'Invalid Email',
    'invalid_mobile': 'Invalid Mobile',
    'mandatory': 'Required',
    'already_registered' : 'Already<br/>Registered',
    'invalid_credentials' : 'Invalid<br/>Credentials',
    'invalid_verification_code' : 'Invalid Code'
  };

  return exports;

});