define(function(require) {

  var exports = {

    validateName: function(value) {
      if (value.trim().length === 0) {
        return 'mandatory';
      } else if (value.trim().length < 2) {
        return 'too_short';
      } else if (value.trim().length > 20) {
        return 'too_long';
      }
    },

    validateEmail: function(value) {
      var emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
      if (!emailRegEx.test(value)) {
        return 'invalid_email';
      }
    },

    validateMobileNumber: function(value) {
      var mobileNumberRegEx = /((7|447|07)\d{9}$)/;
      if (!mobileNumberRegEx.test(value)) {
        return 'invalid_mobile';
      }
    },

    validateMandatoryField: function(value) {
      if (value.trim().length === 0) {
        return 'mandatory';
      }
    },

    validatePassword: function(value) {
      var containAlphaChars = /[a-z]/i.test(value);
      var containNumericChars = /[0-9]/g.test(value);
      var containsUpperCaseChars = /[A-Z]/.test(value);
      var containsLowerCaseChars = /[a-z]/.test(value);
      if (!(containAlphaChars && containNumericChars && containsUpperCaseChars && containsLowerCaseChars)) {
        return 'too_weak';
      }
    },

    renderValidationResult: function(validateFunction, inputField) {
      var error = validateFunction(inputField.val());
      if (error !== undefined) {
        this.addError(inputField, error);
        return false;
      } else {
        this.removeError(inputField);
        return true;
      }
    },

    addError: function(inputField, error) {
      inputField.parent().addClass('error').find('.error-text').html(ErrorMessages[error]);
    },

    removeError: function(inputField) {
      inputField.parent().removeClass('error').find('.error-text').html('');
    }

  };

  var ErrorMessages = {
    'too_short': 'Too Short',
    'too_long': 'Too Long',
    'too_weak': 'Too Weak',
    'invalid_email': 'Invalid Email',
    'invalid_mobile': 'Invalid Mobile',
    'mandatory': 'Required',
    'already_registered' : 'Already<br/>Registered',
    'invalid_credentials' : 'Invalid<br/>Credentials'
  };

  return exports;

});