define('view/edit-card', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/edit-card');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .save-card' : 'saveCard',
      'click .cancel' : 'cancel',
      'click .delete-card-button' : 'deleteCard'
    },

    onDomRefresh: function(){
      var today = new Date();
      var maxDate = new Date();
      maxDate.setFullYear(today.getFullYear() + 10);
      $(".cardtype").mobiscroll().select({
        display: 'modal',
        theme: 'epsilon',
        placeholder: 'Select Card Type',
        minWidth: 200
      });
      $(".mmyy").mobiscroll().date({
        display: 'modal',
        dateOrder: 'mmyyyy',
        mode: 'scroller',
        dateFormat: 'mm / yyyy',
        theme: 'epsilon',
        minDate: today,
        maxDate: maxDate
      });
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    },

    saveCard: function(){
      // TODO - validate & update card
      window.plugins.toast.showShortCenter('Card Successfully Updated');
      vent.trigger('navigate', 'payments');
    },

    cancel: function(){
      vent.trigger('navigate', 'payments');
    },

    deleteCard: function(){
      var view = this;
      vent.trigger('modal:confirm', { yesCallback: view.confirmDeleteCard });
    },

    confirmDeleteCard: function(){
      // TODO - delete card
      vent.trigger('navigate', 'payments');
      vent.trigger('modal:hide');
    }

  });

  return view;

});