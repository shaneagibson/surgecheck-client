define('util/analytics', function(require) {

  var config = require('../config');

  var exports = {};

  exports.initialize = function() {
    window.analytics.startTrackerWithId(config.google.analytics_key);
  };

  exports.setUserId = function(userId) {
    window.analytics.setUserId(userId);
  };

  exports.trackError = function(error) {
    window.analytics.trackException(error, false);
  };

  exports.trackView = function(name) {
    window.analytics.trackView(name);
  };

  return exports;

});