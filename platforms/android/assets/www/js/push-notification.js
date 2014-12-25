define(function(require) {

  var config = require('config');

  var exports = {

    registerDevice: function() {
      return new RSVP.Promise(function(resolve, reject) {
        PushNotification.registerDevice(
          config.google.project_number,
          config.pushapps.app_token,
          resolve,
          reject);
      });
    },

    unRegisterDevice: function() {
      return new RSVP.Promise(function(resolve, reject) {
        PushNotification.unRegisterDevice(resolve,reject);
      });
    },

    getDeviceId: function() {
      return new RSVP.Promise(function(resolve, reject) {
        PushNotification.getDeviceId(resolve, reject);
      })
    }

  };

  return exports;

});