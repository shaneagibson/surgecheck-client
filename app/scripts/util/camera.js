define('util/camera', function(require) {

  var exports = {};

  exports.takePhoto = function() {
    return getPicture(Camera.PictureSourceType.CAMERA);
  };

  exports.loadPhotoFromGallery = function() {
    return getPicture(Camera.PictureSourceType.PHOTOLIBRARY);
  };

  var getPicture = function(sourceType) {
    return new RSVP.Promise(function(resolve, reject) {
      var options = {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : sourceType,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 200,
        targetHeight: 200,
        saveToPhotoAlbum: false
      };
      navigator.camera.getPicture(resolve, reject, options);
    });
  };

  return exports;

});