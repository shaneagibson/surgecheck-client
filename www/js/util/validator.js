define(function(require) {

  var exports = {

    validateFields: function(inputFields) {
      var self = this;
      var isValid = true;
      inputFields.each(function() {
        isValid = isValid | self.validateField($(this));
      });
      return isValid;
    },

    validateField: function(inputField) {
      var self = this;
      var isValid = true;
      var rules = inputField.data('validationrules').split(' ');
      rules.forEach(function(rule) {
        if (isValid && validators[rule]) {
          var error = validators[rule](inputField.val());
          if (error !== undefined) {
            self.addError(inputField, error);
            isValid = false;
          } else {
            self.removeError(inputField);
          }
        }
      });
      return isValid;
    },

    addError: function(inputField, error) {
      inputField.parent().addClass('error').find('.error-text').html(ErrorMessages[error]);
    },

    removeError: function(inputField) {
      inputField.parent().removeClass('error').find('.error-text').html('');
    }

  };

  var validateName = function(value) {
    if (value.trim().length === 0) {
      return 'mandatory';
    } else if (value.trim().length < 2) {
      return 'too_short';
    } else if (value.trim().length > 20) {
      return 'too_long';
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
    if (/^\d{3}$/.test(value)) {
      return 'invalid_verification_code';
    }
  };

  // TODO - move each field validator into separate JS file

  var validators = {
    'mandatory' : validateMandatoryField,
    'password': validatePassword,
    'emailaddress' : validateEmail,
    'mobilenumber' : validateMobileNumber,
    'name' : validateName,
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