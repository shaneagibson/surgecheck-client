define('util/map', function(require) {

  var config = require('../config');

  var exports = {};

  exports.initialize = function() {
    return new RSVP.Promise(function(resolve, reject) {
      google.load("maps", 3, { other_params : "key="+config.google.api_key, callback : resolve });
    });
  };

  exports.render = function(mapElement, centerPosition, zoom, events, markers) {
    var mapOptions = {
      zoom: zoom,
      center: new google.maps.LatLng(centerPosition.coords.latitude, centerPosition.coords.longitude),
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
    if (markers) {
      markers.forEach(function (marker) {
        new google.maps.Marker({
          icon: marker.icon,
          position: new google.maps.LatLng(marker.position.coords.latitude, marker.position.coords.longitude),
          map: map
        });
      });
    }
    return map;
  };

  return exports;

});