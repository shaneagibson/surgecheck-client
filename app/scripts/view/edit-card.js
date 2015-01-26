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
      'click .cancel' : 'cancel'
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
    }

  });

  return view;

});