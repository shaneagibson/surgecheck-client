define('view/add-card', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/add-card');
  var vent = require('../util/vent');
  var validator = require('../util/validator');
  var mobiscroll = require('mobiscroll');
  var serverGateway = require('../util/server-gateway');
  var paymentGateway = require('../util/payment-gateway');
  var toast = require('../util/toast');
  var analytics = require('../util/analytics');
  var context = require('../context');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .save-card' : 'saveCard',
      'click .cancel' : 'cancel',
      'blur input.cardnumber' : 'validateField',
      'blur input.mmyy' : 'validateField',
      'blur input.cvv' : 'validateField',
      'blur input.postcode' : 'validateField'
    },

    initialize: function() {
      analytics.trackView('Add Card');
    },

    onDomRefresh: function(){
      initializeTypePicker();
      initializeMMYYPicker();
      analytics.trackView('Add Card');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    },

    saveCard: function(){
      if (validateForm()) {
        submit();
      }
    },

    validateField: function(e) {
      validator.validateFields($(e.currentTarget));
    },

    cancel: function(){
      vent.trigger('navigate', 'payments');
    },

    showSelectCardTypeModal: function(e){
      var selectElement = $(e.currentTarget).closest('.input-select');
      vent.trigger('modal:show:select', selectElement);
    }

  });

  var validateForm = function(){
    return validator.validateFields($('.form').find('.field'));
  };

  var submit = function(){
    paymentGateway.tokenizeCard(
      getElementValue('.cardnumber'),
      getExpirationMonth(),
      getExpirationYear(),
      getElementValue('.cvv'),
      getElementValue('.postcode'),
      getElementValue('.type'))
      .then(function(nonce) {
        return serverGateway.payment.post('/payment/user/'+context.user.id+'/payment-method', { nonce: nonce })
          .then(function() {
            toast.showShortBottom('Card Successfully Added');
            vent.trigger('navigate', 'payments');
          });
      })
      .catch(function(err) {
        analytics.trackError(JSON.stringify(err));
        toast.showLongBottom('Something unexpected happened. Please try again.');
      });
  };

  var getElementValue = function(selector) {
    return $(selector).val();
  };

  var getExpirationMonth = function() {
    return $(".mmyy").val().substr(0, 1);
  };

  var getExpirationYear = function() {
    return $(".mmyy").val().substr(3, 6);
  };

  var initializeTypePicker = function(){
    $(".type").mobiscroll().select({
      display: 'modal',
      theme: 'epsilon',
      placeholder: 'Select Type',
      minWidth: 200,
      onClose: function(value, button) {
        if (value && button === 'set') $('select.type').val(value.toLowerCase());
        validator.validateFields($('.type'));
      }
    });
  };

  var initializeMMYYPicker = function(){
    var today = new Date();
    var maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 10);
    $(".mmyy").mobiscroll().date({
      display: 'modal',
      dateOrder: 'mmyyyy',
      mode: 'scroller',
      dateFormat: 'mm / yyyy',
      theme: 'epsilon',
      minDate: today,
      maxDate: maxDate,
      onClose: function(value, button) {
        if (value && button === 'set') $('input.mmyy').val(value);
        validator.validateFields($('.mmyy'));
      }
    });
  };

  return view;

});