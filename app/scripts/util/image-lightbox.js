define('util/image-lightbox', function(require) {

  var imagelightbox = require("imagelightbox");

  var exports = {};

  function Lightbox() {

    this.lb = $('.imagelightbox').imageLightbox({
      onStart: function () {
        $('<div id="imagelightbox-overlay"></div>').appendTo('body').fadeIn(250);
      },
      onEnd: function () {
        $('#imagelightbox-overlay').fadeOut(250).remove();
      }
    });

    this.destroy = function() {
      this.lb.quitImageLightbox();
    };

  }

  exports.create = function() {
    return new Lightbox();
  };

  return exports;

});