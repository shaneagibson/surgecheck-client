define('util/map', function(require) {

  var config = require('../config');

  var exports = {};

  function Map(mapElement, onLoaded) {

    this.markers = {};

    this.map = new google.maps.Map(mapElement[0], {
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false
    });

    if (onLoaded) {
      google.maps.event.addListenerOnce(this.map, 'idle', onLoaded);
    }

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

    this.setCenter = function(coords) {
      this.map.setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
    };

    this.setZoom = function(zoom) {
      this.map.setZoom(zoom);
    };

  }

  exports.initialize = function() {
    return new RSVP.Promise(function(resolve, reject) {
      google.load("maps", 3, { other_params : "key="+config.google.api_key, callback : resolve });
    });
  };

  exports.create = function(mapElement, onLoaded) {
    return new Map(mapElement, onLoaded);
  };

  return exports;

});