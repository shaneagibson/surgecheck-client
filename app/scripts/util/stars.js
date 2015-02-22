define('util/stars', function(require) {

  var exports = {};

  exports.initialize = function(element) {
    element.swipe({
      swipeStatus : function(event, phase, direction, distance, duration, fingers) {
        if (phase != "cancel" && phase != "end" && (direction === "left" || direction === "right")) {
          highlightStars(event.touches.item(0).clientX);
        }
      }
    });
    $('.star', element).on('touchstart', function(e) {
      var star = $(e.currentTarget);
      highlightStars(star.position().left + star.width());
    });
  };

  var highlightStars = function(x) {
    $('.star').each(function(s, star){
      var $star = $(star);
      var center = $star.position().left + ($star.width() / 2);
      if (x > center) {
        $star.addClass('highlighted');
      } else if (x < center) {
        $star.removeClass('highlighted');
      }
    });
  };

  return exports;

});