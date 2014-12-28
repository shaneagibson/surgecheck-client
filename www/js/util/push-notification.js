define(function(require) {

  var config = require('./../config');

  var exports = {

    register: function() {
      return registerDevice()
        .then(getDeviceId)
        .then(saveDeviceId);
    },

    unregister: function() {
      return unRegisterDevice()
        .then(deleteDeviceId);
    }

  };

  var registerDevice = function() {
    return new RSVP.Promise(function(resolve, reject) {
      PushNotification.registerDevice(
        config.google.project_number,
        config.pushapps.app_token,
        resolve,
        reject);
    });
  };

  var unRegisterDevice = function() {
    return new RSVP.Promise(function(resolve, reject) {
      PushNotification.unRegisterDevice(resolve,reject);
    });
  };

  var getDeviceId = function() {
    return new RSVP.Promise(function(resolve, reject) {
      PushNotification.getDeviceId(resolve, reject);
    })
  };

  var saveDeviceId = function(deviceId) {
    localStorage.setItem('deviceid', deviceId);
  };

  var deleteDeviceId = function() {
    localStorage.removeItem('deviceid');
  };

  return exports;

});