define('util/rateme', function(require) {

  var APP_VIEW_COUNT_KEY = 'viewcount';

  var vent = require('./vent');
  var config = require('../config');

  var exports = {

    showRateMeDialog: function(){
      var appViewCount = window.localStorage.getItem(APP_VIEW_COUNT_KEY) | 0;
      if (appViewCount === 5) {
        showRateMeDialog();
      }
    },

    reset: function(){
      window.localStorage.setItem(APP_VIEW_COUNT_KEY, 0);
    },

    openAppStore: function(){
      window.open(config.app_store[device.platform], '_system');
    },

    incrementAppViewCount: function() {
      var appViewCount = window.localStorage.getItem(APP_VIEW_COUNT_KEY) | 0;
      appViewCount = appViewCount + 1;
      window.localStorage.setItem(APP_VIEW_COUNT_KEY, appViewCount);
    }

  };

  var showRateMeDialog = function() {
    vent.trigger('modal:rateme');
  };

  return exports;

});