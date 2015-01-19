define(function(require) {

  var exports = {

    isIOS: function() {
      return navigator.userAgent.match(/iPhone/i);
    },

    isAndroid: function() {
      return navigator.userAgent.match('/Android/i');
    }

  };

  return exports;

});