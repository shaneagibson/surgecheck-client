define('util/image-lightbox', function(require) {

  var imagelightbox = require("imagelightbox");

  var exports = {};

  function Lightbox() {

    this.lb = $('.imagelightbox').imageLightbox({
      onStart: function () { $('#mask').show(); },
      onEnd: function () { $('#mask').hide(); }
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