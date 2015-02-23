define('util/map', function(require) {

  var config = require('../config');

  var exports = {};

  exports.initialize = function() {
    return new RSVP.Promise(function(resolve, reject) {
      google.load("maps", 3, { other_params : "key="+config.google.api_key, callback : resolve });
    });
  };

  exports.render = function(mapElement, events, markers) {
    var mapOptions = {
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
    this.fit(map, [ markers[0], markers[1] ]);
    return map;
  };

  exports.fit = function(map, markers) {
    var bounds = new google.maps.LatLngBounds();
    markers.forEach(function(marker){
      bounds.extend(new google.maps.LatLng(marker.position.coords.latitude, marker.position.coords.longitude));
    });
    map.fitBounds(bounds);
  };

  return exports;

});