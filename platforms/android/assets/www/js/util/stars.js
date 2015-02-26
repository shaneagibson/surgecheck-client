define('util/stars', function(require) {

  var exports = {};

  function Stars(element) {

    var highlightStars = function(x) {
      $('.user-star').each(function(s, star){
        var $star = $(star);
        var center = $star.position().left + ($star.width() / 2);
        if (x > center) {
          $star.addClass('highlighted');
        } else if (x < center) {
          $star.removeClass('highlighted');
        }
      });
    };

    var initialize = function() {
      element.swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers) {
          if (phase != "cancel" && phase != "end" && (direction === "left" || direction === "right")) {
            highlightStars(event.touches.item(0).clientX);
          }
        }
      });
      $('.user-star', element).on('touchstart', function(e) {
        var star = $(e.currentTarget);
        highlightStars(star.position().left + star.width());
      });
    };

    initialize();

    this.addChangeListener = function(listener) {
      element.on('touchend', function() {
        listener($('.user-star.highlighted').length);
      });
    };

  }

  exports.create = function(element) {
    return new Stars(element);
  };

  return exports;

});