define('util/validation/password-validator', function() {

  var exports = {

    validate: function (value) {
      var containAlphaChars = /[a-z]/i.test(value);
      var containNumericChars = /[0-9]/g.test(value);
      var containsUpperCaseChars = /[A-Z]/.test(value);
      var containsLowerCaseChars = /[a-z]/.test(value);
      if (!(containAlphaChars && containNumericChars && containsUpperCaseChars && containsLowerCaseChars)) {
        return 'too_weak';
      }
    }

  };

  return exports;

});
