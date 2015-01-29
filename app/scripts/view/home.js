define('view/home', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/home');
  var click = require('../util/click');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    onDomRefresh: function() {
      window.analytics.trackView('Home');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'home');
    }

  });

  return view;

});