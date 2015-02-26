define('mock-cordova', function(require){

  var exports = {

    mock: function() {
      mockPushNotificationPlugin();
      mockGeolocationPlugin();
      mockContactsPlugin();
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

  var mockGeolocationPlugin = function() {
    navigator.geolocation = {};
    navigator.geolocation.getCurrentPosition = function(success, failure, options) {
      var position = {};
      position.coords = {};
      position.coords.latitude = 51.483159;
      position.coords.longitude = -0.309862;
      position.coords.altitude = 0;
      position.coords.accuracy = 1;
      position.coords.altitudeAccuracy = 1;
      position.coords.heading = 0;
      position.coords.speed = 0;
      position.timestamp = Date.now();
      success(position);
    };
  };

  var mockContactsPlugin = function() {
    navigator.contacts = {};
    navigator.contacts.fieldType = {};
    navigator.contacts.fieldType.displayName = 0;
    navigator.contacts.fieldType.name = 0;
    navigator.contacts.fieldType.nickname = 0;
    navigator.contacts.fieldType.phoneNumbers = 0;
    navigator.contacts.find = function(fields, success, failure) {
      var contacts = [
        {
          name: "Shane Gibson",
          phoneNumbers: [ "07920053773" ],
          nickname: "Shane",
          displayName: "Shane Gibson"
        },
        {
          name: "Aaron East",
          phoneNumbers: [ "07912341234" ],
          nickname: "Aaron",
          displayName: "Aaron East"
        },
        {
          name: "Sara Gibson",
          phoneNumbers: [ "07912341235" ],
          nickname: "Sara Gibson",
          displayName: "Sara Gibson"
        }
      ];
      success(contacts);
    };
  };

  return exports;

});