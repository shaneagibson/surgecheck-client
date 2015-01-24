define('util/mock-server', function(require) {

  var UriUtil = require('./uri');

  var registerResponse = require('text!../mocks/register.response.json');
  var verificationCodeResponse = require('text!../mocks/verification-code.response.json');

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
        return mocks[i];
      }
    }
  };

  var registerMock = function(type, pathRegEx, isSuccess, response) {
    mocks.push(new Mock(type, pathRegEx, isSuccess, response));
  };

  registerMock('POST', '/account/register', true, JSON.parse(registerResponse));
  registerMock('POST', '/account/verify', true, JSON.parse(verificationCodeResponse));

  return exports;

});