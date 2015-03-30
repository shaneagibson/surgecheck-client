define('util/mock-server', function(require) {

  var UriUtil = require('./uri');

  var exports = {};

  var mocks = [];

  function Mock(type, pathRegEx, isSuccess, response) {
    this.type = type;
    this.pathRegEx = pathRegEx;
    this.isSuccess = isSuccess;
    this.response = response;
    this.isMatch = function(type, url) {
      return this.type === type && UriUtil.resolvePath(url).match(this.pathRegEx);
    };
    this.respond = function(success, failure) {
      if (this.isSuccess) {
        success(this.response);
      } else {
        failure(this.response);
      }
    };
  }

  exports.findMock = function(type, url) {
    for (var i = 0; i < mocks.length; i++) {
      if (mocks[i].isMatch(type, url)) {
        console.log('using mock found for '+type+' '+url);
        return mocks[i];
      }
    }
  };

  var registerMock = function(type, pathRegEx, isSuccess, response) {
    mocks.push(new Mock(type, pathRegEx, isSuccess, response));
  };

  registerMock(
    'GET',
    '/surgecheck/status',
    true,
    {
      "current" : 1.1,
      "historic" : [
        {
          "timestamp": Date.now() - (1000 * 60 * 60 * 2.5),
          "high": 1.4,
          "avg": 1.2,
          "low": 1.1
        },
        {
          "timestamp": Date.now() - (1000 * 60 * 60 * 1.5),
          "high": 1.4,
          "avg": 1.3,
          "low": 1.2
        },
        {
          "timestamp": Date.now() - (1000 * 60 * 60 * 0.5),
          "high": 1.4,
          "avg": 1.3,
          "low": 1.1
        },
        {
          "timestamp": Date.now() + (1000 * 60 * 60 * 0.5),
          "high": 1.3,
          "avg": 1.2,
          "low": 1.1
        },
        {
          "timestamp": Date.now() + (1000 * 60 * 60 * 1.5),
          "high": 1.2,
          "avg": 1.1,
          "low": 1.0
        },
        {
          "timestamp": Date.now() + (1000 * 60 * 60 * 2.5),
          "high": 1.5,
          "avg": 1.1,
          "low": 1.0
        }
      ]
    }
  );

  return exports;

});