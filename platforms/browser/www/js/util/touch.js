define(function(require) {

  var $ = require('jquery');

  var exports = {};

  exports.initializeTouchFeedback = function() {
    $('.touch-color').on('touchstart', function(e){
      $(this).addClass('js-touch-color');
    });
    $('.touch-color').on('touchend', function(e){
      $(this).removeClass('js-touch-color');
    });
  };

  return exports;

});