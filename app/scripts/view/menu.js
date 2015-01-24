define('view/menu', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/menu');
  var click = require('../util/click');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .home:not(.active)' : 'showHome',
      'click .active' : 'hideMenu',
      'click .menu-close' : 'hideMenu'
    },

    setActiveItem: function(activeItem) {
      $('li.active').removeClass('active');
      $('li.'+activeItem).addClass('active');
    },

    showHome: function() {
      vent.trigger('navigate', 'home');
      this.hideMenu();
    },

    hideMenu: function() {
      $('body').removeClass('menu-open');
    }

  });

  return view;

});