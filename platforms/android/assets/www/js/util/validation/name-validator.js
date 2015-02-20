define('util/validation/name-validator', function() {

  var exports = {

    validate: function(value) {
      if (value.trim().length === 0) {
        return 'mandatory';
      } else if (value.trim().length < 2) {
        return 'too_short';
      } else if (value.trim().length > 20) {
        return 'too_long';
      }
    }

  };

  return exports;

});