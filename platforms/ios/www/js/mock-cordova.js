define('mock-cordova', function(require){

  var exports = {

    mock: function() {
      mockGeolocationPlugin();
    }

  };

  var mockGeolocationPlugin = function() {
    navigator.geolocation = {};
    navigator.geolocation.getCurrentPosition = function(success, failure, options) {
      var position = {};
      position.coords = {};
      position.coords.latitude = 51.483159;
      position.coords.longitude = -0.309862;
      position.coords.altitude = 0;
      position.coords.accuracy = 1;
      position.coords.altitudeAccuracy = 1;
      position.coords.heading = 0;
      position.coords.speed = 0;
      position.timestamp = Date.now();
      success(position);
    };
  };

  return exports;

});