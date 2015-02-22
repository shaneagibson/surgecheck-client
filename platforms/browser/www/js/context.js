define('context', function(require){

  var exports = {};

  exports.getPaymentMethodById = function(paymentMethodId) {
    for (var i = 0; i < this.paymentMethods.length; i++) {
      if (this.paymentMethods[i].id === paymentMethodId) {
        return this.paymentMethods[i];
      }
    }
  };

  exports.getPlaceById = function(placeId) {
    for (var i = 0; i < this.places.length; i++) {
      if (this.places[i].id === placeId) {
        return this.places[i];
      }
    }
  };

  return exports;

});