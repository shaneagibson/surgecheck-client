define('util/toast', function(require) {

  var exports = {};

  exports.showShortBottom = function(message) {
    window.plugins.toast.showShortBottom(message);
  };

  exports.showLongBottom = function() {
    window.plugins.toast.showLongBottom(message);
  };

  return exports;

});