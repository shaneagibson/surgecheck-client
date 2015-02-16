define('util/server-gateway', function(require) {

  var config = require('../config');
  var mockServer = require('./mock-server');

  function Server(server) {

    this.scheme = server.scheme;
    this.host = server.host;
    this.port = server.port;

    this.post = function(path, payload, queryParams, contentType) {
      return issueRequest('POST', asUrl(this.scheme, this.host, this.port, path, queryParams), contentType, payload);
    };

    this.put = function(path, payload, queryParams, contentType) {
      return issueRequest('PUT', asUrl(this.scheme, this.host, this.port, path, queryParams, payload), contentType);
    };

    this.get = function(path, queryParams, contentType) {
      return issueRequest('GET', asUrl(this.scheme, this.host, this.port, path, queryParams), contentType);
    };

    this.delete = function(path, queryParams, contentType) {
      return issueRequest('DELETE', asUrl(this.scheme, this.host, this.port, path, queryParams), contentType);
    };

  }

  var exports = {

    promotion: new Server(config.server.promotion),
    payment: new Server(config.server.payment),
    account: new Server(config.server.account)

  };

  var asUrl = function(scheme, host, port, path, queryParams) {
    var queryString = queryParams ? '?' + decodeURIComponent($.param(queryParams)) : '';
    var baseUrl = scheme + '://' + host + ':' + port;
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
          contentType: contentType || "application/json; charset=utf-8"
        }
      );
    });
  };

  return exports;

});