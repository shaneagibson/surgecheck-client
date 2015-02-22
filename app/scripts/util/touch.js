define('util/touch', function(require) {

  var $ = require('jquery');

  var exports = {};

  exports.initializeTouchFeedback = function() {
    registerFeedback($('.touch-color'), 'js-touch-color');
    registerFeedback($('.touch-size'), 'js-touch-size');
  };

  exports.removeTouchFeedback = function(element) {
    element.off('touchstart touchend touchcancel touchleave');
  };

  var registerFeedback = function(elements, touchClass) {
    elements.on('touchstart', function(){
      $(this).addClass(touchClass);
    });
    elements.on('touchend', function(){
      $(this).removeClass(touchClass);
    });
    elements.on('touchcancel', function(){
      $(this).removeClass(touchClass);
    });
    elements.on('touchleave', function(){
      $(this).removeClass(touchClass);
    });
  };

  return exports;

});