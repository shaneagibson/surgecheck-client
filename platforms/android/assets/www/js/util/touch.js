define('util/touch', function(require) {

  var $ = require('jquery');

  var exports = {};

  exports.initializeTouchFeedback = function() {
    $('.touch-color').on('touchstart', function(e){
      console.log('TOUCH START');
      $(this).addClass('js-touch-color');
    });
    $('.touch-color').on('touchend', function(e){
      console.log('TOUCH END');
      $(this).removeClass('js-touch-color');
    });
    $('.touch-color').on('touchcancel', function(e){
      console.log('TOUCH CANCEL');
      $(this).removeClass('js-touch-color');
    });
    $('.touch-color').on('touchleave', function(e){
      console.log('TOUCH LEAVE');
      $(this).removeClass('js-touch-color');
    });
  };

  return exports;

});