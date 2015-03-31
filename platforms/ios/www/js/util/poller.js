define('util/poller', function(require) {

  var exports = {};

  function Poller(test, timeout, delay) {

    this.poll = function() {

      var expiryTime = Date.now() + timeout;

      var check = function(resolve, reject) {
        if (test()) {
          resolve();
        } else {
          if (expiryTime > Date.now()) {
            setTimeout(function() { check(resolve, reject); }, delay);
          } else {
            reject("Poller expired without success");
          }
        }
      };

      return new RSVP.Promise(function(resolve, reject) {
        check(resolve, reject);
      });

    };

  }

  exports.create = function(test, timeout, delay) {
    return new Poller(test, timeout, delay);
  };

  return exports;

});