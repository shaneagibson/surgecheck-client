define('mock-cordova', function(require){

  var exports = {

    mock: function() {
      mockPushNotificationPlugin();
    }

  };

  var mockPushNotificationPlugin = function() {
    PushNotification.registerDevice = function (projectNumber, appToken, success, failure) {
      success();
    };
    PushNotification.getDeviceId = function (success, failure) {
      success('ABC123');
    };
  };

  return exports;

});