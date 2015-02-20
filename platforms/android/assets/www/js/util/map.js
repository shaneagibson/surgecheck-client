define('util/map', function(require) {

  var config = require('../config');

  var exports = {};

  exports.initialize = function() {
    return new RSVP.Promise(function(resolve, reject) {
      google.load("maps", 3, { other_params : "key="+config.google.api_key, callback : resolve });
    });
  };

  exports.renderMap = function(mapElement, latitude, longitude) {
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(latitude, longitude),
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false
    };
    return new google.maps.Map(mapElement[0], mapOptions);
  };

  return exports;

});