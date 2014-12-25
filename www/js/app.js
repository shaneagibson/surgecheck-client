define(function(require) {

  var pushNotification = require('./push-notification');

  var app = {

    initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
      window.onerror = this.onError;
    },

    onDeviceReady: function() {
      pushNotification.registerDevice()
        .then(function() {
          console.log('DEVICE REGISTERED');
        })
        .then(pushNotification.getDeviceId)
        .then(function(deviceId) {
          console.log('DEVICE ID: '+deviceId);
        })
        .catch(function(error) {
          console.log('ERROR: '+error);
        })
    },

    onError: function(error) {
      console.log('error: '+error);
    }

  };

  return app;

});