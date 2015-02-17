define('util/map', function(require) {

  var config = require('../config');

  var exports = {};

  exports.initialize = function() {
    return new RSVP.Promise(function(resolve, reject) {
      google.load("maps", 3, { other_params : "key="+config.google.api_key, callback : resolve });
    });
  };

  exports.renderMap = function(mapElement, latitude, longitude, events) {
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
    var map = new google.maps.Map(mapElement[0], mapOptions);
    if (events) {
      for (var key in events) {
        if (events.hasOwnProperty(key)) {
          google.maps.event.addListener(map, key, events[key]);
        }
      }
    }
    return map;
  };

  return exports;

});