define('util/validation/email-validator', function() {

  var exports = {

    validate: function(value) {
      var emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
      if (!emailRegEx.test(value)) {
        return 'invalid_email';
      }
    }

  };

  return exports;

});