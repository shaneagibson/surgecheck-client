define('view/about', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/about');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    showMenu: function(){
      vent.trigger('menu:show', 'about');
    }

  });

  return view;

});