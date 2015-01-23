define('util/server-gateway', function(require) {

  var config = require('../config');

  var exports = {

    post: function(path, payload, queryParams) {
      return issueRequest('POST', asUrl(path, queryParams), payload);
    },

    get: function(path, queryParams) {
      return issueRequest('POST', asUrl(path, queryParams));
    }

  };

  var asUrl = function(path, queryParams) {
    var queryString = queryParams ? '?' + decodeURIComponent($.param(queryParams)) : '';
    var baseUrl = config.server.scheme + '://' + config.server.host + ':' + config.server.port;
    return baseUrl + path + queryString;
  };

  var issueRequest = function(type, url, payload) {
    return new RSVP.Promise(function(resolve, reject) {
      $.ajax(
        {
          url: url,
          success: resolve,
          error: function(request, status, error) {
            reject(request);
          },
          type: type,
          data: JSON.stringify(payload || {}),
          dataType: 'json',
          contentType: "application/json; charset=utf-8"
        }
      );
    });
  };

  return exports;

});