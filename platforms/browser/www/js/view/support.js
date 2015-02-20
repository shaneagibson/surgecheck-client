define('view/support', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/support');
  var analytics = require('../util/analytics');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    onDomRefresh: function() {
      analytics.trackView('Support');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'support');
    }

  });

  return view;

});