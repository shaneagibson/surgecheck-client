define('util/server-gateway', function(require) {

  var config = require('../config');
  var mockServer = require('./mock-server');

  var exports = {

    post: function(path, payload, queryParams, contentType) {
      return issueRequest('POST', asUrl(path, queryParams), contentType, payload);
    },

    put: function(path, payload, queryParams, contentType) {
      return issueRequest('PUT', asUrl(path, queryParams, payload), contentType);
    },

    get: function(path, queryParams, contentType) {
      return issueRequest('GET', asUrl(path, queryParams), contentType);
    },

    delete: function(path, queryParams, contentType) {
      return issueRequest('DELETE', asUrl(path, queryParams), contentType);
    }

  };

  var asUrl = function(path, queryParams) {
    var queryString = queryParams ? '?' + decodeURIComponent($.param(queryParams)) : '';
    var baseUrl = config.server.scheme + '://' + config.server.host + ':' + config.server.port;
    return baseUrl + path + queryString;
  };

  var issueRequest = function(type, url, contentType, payload) {
    return new RSVP.Promise(function(resolve, reject) {
      if (config.mock) {
        var mock = mockServer.findMock(type, url);
        if (mock) {
          return mock.respond(resolve, reject);
        }
      }
      return $.ajax(
        {
          url: url,
          success: resolve,
          error: function(request, status, error) {
            reject(request);
          },
          type: type,
          data: JSON.stringify(payload || {}),
          dataType: 'json',
          contentType: contentType | "application/json; charset=utf-8"
        }
      );
    });
  };

  return exports;

});