define('util/validator', function(require) {

  var nameValidator = require('util/validation/name-validator');
  var verificationCodeValidator = require('util/validation/verificationcode-validator');
  var passwordValidator = require('util/validation/password-validator');
  var mobileNumberValidator = require('util/validation/mobilenumber-validator');
  var mandatoryValidator = require('util/validation/mandatory-validator');
  var emailValidator = require('util/validation/email-validator');

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
      var rulesString = inputField.data('validationrules');
      if (!rulesString) return true;
      var rules = rulesString.split(' ');
      var errors = rules.map(function(rule) {
        if (validators[rule]) {
          var value = inputField.val();
          return validators[rule].validate(value);
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

  var validators = {
    'mandatory' : mandatoryValidator,
    'password': passwordValidator,
    'emailaddress' : emailValidator,
    'mobilenumber' : mobileNumberValidator,
    'name' : nameValidator,
    'verificationcode' : verificationCodeValidator
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