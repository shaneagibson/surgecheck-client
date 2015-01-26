define('util/touch', function(require) {

  var $ = require('jquery');

  var exports = {};

  exports.initializeTouchFeedback = function() {
    $('.touch-color').on('touchstart', function(e){
      $(this).addClass('js-touch-color');
    });
    $('.touch-color').on('touchend', function(e){
      $(this).removeClass('js-touch-color');
    });
    $('.touch-color').on('touchcancel', function(e){
      $(this).removeClass('js-touch-color');
    });
    $('.touch-color').on('touchleave', function(e){
      $(this).removeClass('js-touch-color');
    });
  };

  return exports;

});