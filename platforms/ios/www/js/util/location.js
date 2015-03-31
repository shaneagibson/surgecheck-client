define('util/location', function() {

  var exports = {};

  exports.getInverseCoordinate = function(center, location) {
    var yDiff = center.longitude - location.longitude;
    var xDiff = center.latitude - location.latitude;
    return {
      longitude: center.longitude + yDiff,
      latitude: center.latitude + xDiff
    };
  };

  return exports;

});