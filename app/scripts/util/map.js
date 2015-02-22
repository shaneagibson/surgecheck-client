define('util/map', function(require) {

  var config = require('../config');

  var exports = {};

  function Map(mapElement) {

    this.markers = {};

    this.map = new google.maps.Map(mapElement[0], {
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false
    });

    this.addEventListener = function(eventName, handler) {
      google.maps.event.addListener(this.map, eventName, handler);
    };

    this.addMarker = function(id, icon, coords) {
      if (this.markers[id]) this.markers[id].setMap(null);
      this.markers[id] = new google.maps.Marker({
        icon: icon,
        position: new google.maps.LatLng(coords.latitude, coords.longitude),
        map: this.map
      });
    };

    this.fitToMarkers = function() {
      var bounds = new google.maps.LatLngBounds();
      for (var key in this.markers) {
        if (this.markers.hasOwnProperty(key)) {
          bounds.extend(this.markers[key].position);
        }
      }
      this.map.fitBounds(bounds);
    };

  }

  exports.initialize = function() {
    return new RSVP.Promise(function(resolve, reject) {
      google.load("maps", 3, { other_params : "key="+config.google.api_key, callback : resolve });
    });
  };

  exports.create = function(mapElement) {
    return new Map(mapElement);
  };

  return exports;

});