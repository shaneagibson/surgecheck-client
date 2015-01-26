define('view/add-card', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/add-card');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .save-card' : 'saveCard',
      'click .cancel' : 'cancel',
      'click .input-select' : 'showSelectCardTypeModal'
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