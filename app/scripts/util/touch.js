define('util/touch', function(require) {

  var $ = require('jquery');

  var exports = {};

  exports.initializeTouchFeedback = function() {
    registerFeedback($('.touch-color'), 'js-touch-color');
    registerFeedback($('.touch-size'), 'js-touch-size');
  };

  var registerFeedback = function(elements, touchClass) {
    elements.on('touchstart', function(e){
      $(this).addClass(touchClass);
    });
    elements.on('touchend', function(e){
      $(this).removeClass(touchClass);
    });
    elements.on('touchcancel', function(e){
      $(this).removeClass(touchClass);
    });
    elements.on('touchleave', function(e){
      $(this).removeClass(touchClass);
    });
  };

  return exports;

});