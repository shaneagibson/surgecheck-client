define('view/place', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/place');
  var click = require('../util/click');
  var context = require('../context');
  var analytics = require('../util/analytics');
  var vent = require('../util/vent');
  var stars = require('../util/stars');

  var view = Marionette.LayoutView.extend({

    tagName: 'div',

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    initialize: function() {
      this.place = context.getPlaceById(parseInt(this.options.placeId));
    },

    onDomRefresh: function() {
      analytics.trackView('Place +'+this.place.name);
      stars.initialize($('.rating'));
    },

    serializeData: function() {
      return this.place;
    },

    showMenu: function(){
      vent.trigger('menu:show', 'home');
    }

  });

  return view ;

});