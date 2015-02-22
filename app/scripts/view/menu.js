define('view/menu', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/menu');
  var click = require('../util/click');
  var vent = require('../util/vent');
  var swipe = require('../util/swipe');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .active' : 'hideMenu',
      'click .menu-close' : 'hideMenu',
      'click .menu-item:not(.active)' : 'showMenuItem'
    },

    initialize: function() {
      swipe.register(this.el, swipe.LEFT, this.hideMenu);
    },

    showMenuItem: function(e) {
      var selectedItem = $(e.currentTarget).closest('li').attr('id');
      this.setActiveItem(selectedItem);
      vent.trigger('navigate', selectedItem);
      this.hideMenu();
    },

    hideMenu: function() {
      $('body').removeClass('menu-open');
    },

    setActiveItem: function(activeItem) {
      $('li.active').removeClass('active');
      $('li#'+activeItem).addClass('active');
    }

  });

  return view;

});