define('util/uri', function() {

  var exports = {};

  exports.resolvePath = function(url) {
    return url.substring(url.indexOf('/', url.lastIndexOf(':')));
  };

  return exports;

});