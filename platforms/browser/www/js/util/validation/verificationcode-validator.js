define('util/validation/verificationcode-validator', function() {

  var exports = {

    validate: function (value) {
      if (!/^\d{3}$/.test(value)) {
        return 'invalid_verification_code';
      }
    }

  };

  return exports;

});
