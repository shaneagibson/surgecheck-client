define('view/edit-card', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/edit-card');
  var vent = require('../util/vent');
  var context = require('../context');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');
  var analytics = require('../util/analytics');
  var toast = require('../util/toast');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .save-card' : 'saveCard',
      'click .cancel' : 'cancel',
      'click .delete-card' : 'deleteCard',
      'blur input.cardnumber' : 'validateField',
      'blur input.mmyy' : 'validateField',
      'blur input.cvv' : 'validateField',
      'blur input.postcode' : 'validateField'
    },

    initialize: function(){
      var paymentMethod = context.getPaymentMethodById(this.options.cardId);
      prepopulate(paymentMethod);
      initializeTypePicker(paymentMethod.type);
      initializeMMYYPicker(new Date('20'+paymentMethod.expiryYear, parseInt(paymentMethod.expiryMonth) - 1));
      analytics.trackView('Edit Card');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    },

    saveCard: function(){
      if (validateForm()) {
        submit(this);
      }
    },

    validateField: function(e) {
      validator.validateFields($(e.currentTarget));
    },

    cancel: function(){
      vent.trigger('navigate', 'payments');
    },

    deleteCard: function(){
      var view = this;
      vent.trigger('modal:confirm', { title: 'Delete Card', yesCallback: function() { view.confirmDeleteCard(); } });
    },

    confirmDeleteCard: function(){
      serverGateway.payment.delete('/payment/user/'+context.user.id+'/payment-method/'+this.options.cardId)
        .then(function() {
          vent.trigger('navigate', 'payments');
          vent.trigger('modal:hide');
          toast.showShortBottom('Card Successfully Deleted');
        })
        .catch(function(err) {
          analytics.trackError(JSON.stringify(err));
          toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  var prepopulate = function(paymentMethod) {
    $('.cardnumber').val('•••• •••• •••• '+paymentMethod.last4Digits);
    $('.mmyy').val(paymentMethod.expiryMonth + ' / 20' + paymentMethod.expiryYear);
    $('.postcode').val(paymentMethod.postcode);
    $('.type').val(paymentMethod.type);
  };

  var validateForm = function(){
    return validator.validateFields($('.form').find('.field'));
  };

  var submit = function(view){
    // TODO - validate & update card
    toast.showShortBottom('Card Successfully Updated');
    vent.trigger('navigate', 'payments');
  };

  var initializeTypePicker = function(defaultValue){
    $(".type").mobiscroll().select({
      display: 'modal',
      theme: 'epsilon',
      placeholder: 'Select Type',
      minWidth: 200,
      defaultValue: defaultValue
    });
  };

  var initializeMMYYPicker = function(defaultValue){
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
      defaultValue: defaultValue
    });
  };

  return view;

});