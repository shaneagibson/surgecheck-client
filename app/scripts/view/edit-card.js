define('view/edit-card', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/edit-card');
  var vent = require('../util/vent');
  var context = require('../context');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .save-card' : 'saveCard',
      'click .cancel' : 'cancel',
      'click .delete-card' : 'deleteCard'
    },

    onDomRefresh: function(){
      var paymentMethod = context.getPaymentMethodById(this.options.cardId);
      this.prepopulate(paymentMethod);
      this.initializeTypePicker(paymentMethod.type);
      this.initializeMMYYPicker(new Date('20'+paymentMethod.expiryYear, parseInt(paymentMethod.expiryMonth) - 1));
      window.analytics.trackView('Edit Card');
    },

    prepopulate: function(paymentMethod) {
      $('.cardnumber').val('•••• •••• •••• '+paymentMethod.last4Digits);
      $('.mmyy').val(paymentMethod.expiryMonth + ' / 20' + paymentMethod.expiryYear);
      $('.postcode').val(paymentMethod.postcode);
      $('.type').val(paymentMethod.type);
    },

    initializeTypePicker: function(defaultValue){
      $(".type").mobiscroll().select({
        display: 'modal',
        theme: 'epsilon',
        placeholder: 'Select Type',
        minWidth: 200,
        defaultValue: defaultValue
      });
    },

    initializeMMYYPicker: function(defaultValue){
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

    submit: function(){
      // TODO - validate & update card
      window.plugins.toast.showShortCenter('Card Successfully Updated');
      vent.trigger('navigate', 'payments');
    },

    cancel: function(){
      vent.trigger('navigate', 'payments');
    },

    deleteCard: function(){
      var view = this;
      vent.trigger('modal:confirm', { title: 'Delete Card', yesCallback: function() { view.confirmDeleteCard(); } });
    },

    confirmDeleteCard: function(){
      serverGateway.delete('/payment/user/'+context.user.id+'/payment-method/'+this.options.cardId)
        .then(function() {
          vent.trigger('navigate', 'payments');
          vent.trigger('modal:hide');
          window.plugins.toast.showShortCenter('Card Successfully Deleted');
        })
        .catch(function(err) {
          window.analytics.trackException(JSON.stringify(err), false);
          window.plugins.toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});