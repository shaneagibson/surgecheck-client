define('view/payments', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/payments');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .edit-card' : 'editCard',
      'click .add-card' : 'addCard'
    },

    onDomRefresh: function() {
      window.analytics.trackView('Payments');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    },

    addCard: function(){
      vent.trigger('navigate', 'add-card');
    },

    editCard: function(e){
      var cardId = $(e.currentTarget).closest('.edit-card').data('cardid');
      vent.trigger('navigate', 'edit-card/'+cardId);
    }


  });

  return view;

});