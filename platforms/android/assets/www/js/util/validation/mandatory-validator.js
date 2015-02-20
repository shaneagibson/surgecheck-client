define('util/validation/mandatory-validator', function() {

  var exports = {

    validate: function (value) {
      if (!value || value.trim().length === 0) {
        return 'mandatory';
      }
    }

  };

  return exports;

});