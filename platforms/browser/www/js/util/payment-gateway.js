define('util/payment-gateway', function(require) {

  var serverGateway = require('./server-gateway');
  var braintree = require('braintree');
  var config = require('../config');

  var exports = {};

  exports.initialize = function() {
    return serverGateway.payment.get('/payment/token')
      .then(function(response) {
        if (!config.mock) exports.client = new braintree.api.Client({ clientToken : response.token });
      });
  };

  exports.tokenizeCard = function(cardNumber, expirationMonth, expirationYear, cvv, postcode, type) {
    return new RSVP.Promise(function(resolve, reject) {
      if (config.mock) resolve('dummy-braintree-nonce.'+Date.now());
      exports.client.tokenizeCard({
          number: cardNumber,
          expirationMonth: expirationMonth,
          expirationYear: expirationYear,
          cvv: cvv,
          billingAddress: {
            postalCode: postcode,
            region: type
          }
        }, function (err, nonce) {
          if (err) {
            reject(err);
          } else {
            resolve(nonce);
          }
        });
    });
  };

  return exports;

});