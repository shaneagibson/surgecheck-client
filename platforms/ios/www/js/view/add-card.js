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

    onDomRefresh: function(){
      this.initializeTypePicker();
      this.initializeMMYYPicker();
      analytics.trackView('Add Card');
    },

    initializeTypePicker: function(){
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
    },

    initializeMMYYPicker: function(){
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
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    },

    saveCard: function(){
      if (this.validateForm()) {
        this.submit();
      }
    },

    validateForm: function(){
      return validator.validateFields($('.form').find('.field'));
    },

    validateField: function(e) {
      validator.validateFields($(e.currentTarget));
    },

    submit: function(){
      paymentGateway.tokenizeCard(
          this.getElementValue('.cardnumber'),
          this.getExpirationMonth(),
          this.getExpirationYear(),
          this.getElementValue('.cvv'),
          this.getElementValue('.postcode'),
          this.getElementValue('.type'))
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
    },

    cancel: function(){
      vent.trigger('navigate', 'payments');
    },

    showSelectCardTypeModal: function(e){
      var selectElement = $(e.currentTarget).closest('.input-select');
      vent.trigger('modal:show:select', selectElement);
    },

    getElementValue: function(selector) {
      return $(selector).val();
    },

    getExpirationMonth: function() {
      return $(".mmyy").val().substr(0, 1);
    },

    getExpirationYear: function() {
      return $(".mmyy").val().substr(3, 6);
    }

  });

  return view;

});