define('view/add-card', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/add-card');
  var vent = require('../util/vent');
  var mobiscroll = require('mobiscroll');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .save-card' : 'saveCard',
      'click .cancel' : 'cancel'
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
      window.analytics.trackView('Add Card');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    },

    saveCard: function(){
      // TODO - validate & add card
      window.plugins.toast.showShortCenter('Card Successfully Added');
      vent.trigger('navigate', 'payments');
    },

    cancel: function(){
      vent.trigger('navigate', 'payments');
    },

    showSelectCardTypeModal: function(e){
      var selectElement = $(e.currentTarget).closest('.input-select');
      vent.trigger('modal:show:select', selectElement);
    }

  });

  return view;

});