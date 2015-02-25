define('view/modal-photo', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/modal-photo');
  var vent = require('../util/vent');
  var camera = require('../util/camera');
  var toast = require('../util/toast');
  var analytics = require('../util/analytics');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .camera' : 'onCamera',
      'click .upload' : 'onUpload'
    },

    onCamera: function(){
      processPhoto(camera.takePhoto);
    },

    onUpload: function(){
      processPhoto(camera.loadPhotoFromGallery);
    }

  });

  var processPhoto = function(getPhoto) {
    getPhoto()
      .then(function(imageData) {
        vent.trigger('photo', imageData);
        vent.trigger('modal:hide');
      })
      .catch(function(error) {
        analytics.trackError(JSON.stringify(error));
        toast.showLongBottom('Something unexpected happened. Please try again.');
      });
  };

  return view;

});