define(function(require) {

  var pushNotification = require('./push-notification');

  var app = {

    initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
      window.onerror(this.onError);
    },

    onDeviceReady: function() {
      pushNotification.getDeviceId()
        .then(console.log)
        .catch(console.log);
    },

    onError: function(error) {
      console.log('error: '+error);
    }

  };

  return app;

});