define('util/vent', function(require) {

  var EventBus = require('event-bus');

  return new EventBus();

});