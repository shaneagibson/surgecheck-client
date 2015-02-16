define('util/validation/mobilenumber-validator', function() {

  var exports = {

    validate: function (value) {
      var mobileNumberRegEx = /((7|447|07)\d{9}$)/;
      if (!mobileNumberRegEx.test(value)) {
        return 'invalid_mobile';
      }
    }

  };

  return exports;

});
