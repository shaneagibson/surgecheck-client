define('util/geolocation', function(require) {

  var exports = {};

  exports.getCurrentPosition = function(options) {
    return new RSVP.Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  return exports;

});