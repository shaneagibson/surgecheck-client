define('util/click', function(require) {

  var _ = require('underscore');

  var exports = {
    single : function(fn) {
      return _.debounce(fn, 1500, true);
    }
  };

  return exports;

});