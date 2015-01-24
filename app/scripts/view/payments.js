define('view/payments', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/payments');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    }

  });

  return view;

});