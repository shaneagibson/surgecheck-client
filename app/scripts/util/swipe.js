define('util/swipe', function(require) {

  var Hammer = require('hammer');

  var exports = {};

  exports.LEFT = Hammer.DIRECTION_LEFT;
  exports.RIGHT = Hammer.DIRECTION_RIGHT;
  exports.UP = Hammer.DIRECTION_UP;
  exports.DOWN = Hammer.DIRECTION_DOWN;

  exports.register = function(element, direction, handler) {
    var hammer = new Hammer(element);
    hammer.on('swipe', function(e) {
      if (e.direction === direction) {
        handler();
      }
    });
  };

  return exports;

});