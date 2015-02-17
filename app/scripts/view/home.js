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
      'click .icon-menu' : 'showMenu',
      'click .tab.options' : 'showOptions',
      'click .tab.map' : 'showMap'
    },

    onDomRefresh: function() {
      var view = this;
      analytics.trackView('Home');
      this.map = map.renderMap($('.map-canvas .map'), 51, 1, {
        'dragstart': view.startMapDrag,
        'dragend': view.endMapDrag
      });
    },

    showMenu: function(){
      vent.trigger('menu:show', 'home');
    },

    showMap: function(){
      this.toggleTab($('.map-canvas'), $('.options-canvas'), $('.tab.map'));
    },

    showOptions: function(){
      this.toggleTab($('.options-canvas'), $('.map-canvas'), $('.tab.options'));
    },

    toggleTab: function(showCanvas, hideCanvas, selectTab) {
      showCanvas.show();
      hideCanvas.hide();
      $('.tab.selected').removeClass('selected');
      selectTab.addClass('selected');
    },

    startMapDrag: function() {
      $('.map-canvas .icon-target').addClass('drag');
    },

    endMapDrag: function() {
      $('.map-canvas .icon-target').removeClass('drag');
      console.log(JSON.stringify(this.map.getCenter()));
    }

  });

  return view;

});