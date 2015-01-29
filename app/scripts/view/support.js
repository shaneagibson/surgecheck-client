define('view/support', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/support');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    onDomRefresh: function() {
      window.analytics.trackView('Support');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'support');
    }

  });

  return view;

});