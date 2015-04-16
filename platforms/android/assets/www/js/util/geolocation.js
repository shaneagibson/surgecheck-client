define('util/geolocation', function(require) {

  var exports = {};

  var defaultOptions = { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 };

  exports.getCurrentPosition = function(options) {
    return new RSVP.Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options || defaultOptions);
    });
  };

  return exports;

});