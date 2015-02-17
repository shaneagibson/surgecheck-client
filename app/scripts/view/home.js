define('view/home', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/home');
  var click = require('../util/click');
  var analytics = require('../util/analytics');
  var vent = require('../util/vent');
  var map = require('../util/map');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    onDomRefresh: function() {
      analytics.trackView('Home');
      map.renderMap($('.map-canvas'), 51, 1);
    },

    showMenu: function(){
      vent.trigger('menu:show', 'home');
    }

  });

  return view;

});