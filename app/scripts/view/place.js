define('view/place', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/place');
  var click = require('../util/click');
  var context = require('../context');
  var analytics = require('../util/analytics');
  var vent = require('../util/vent');
  var stars = require('../util/stars');
  var serverGateway = require('../util/server-gateway');
  var imageLightbox = require("../util/image-lightbox");

  var view = Marionette.LayoutView.extend({

    tagName: 'div',

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .done' : 'showHome'
    },

    initialize: function() {
      view.place = context.getPlaceById(parseInt(this.options.placeId));
    },

    onDomRefresh: function() {
      analytics.trackView('Place +'+view.place.name);
      view.imagelightbox = imageLightbox.create();
      view.stars = stars.create($('.rating'));
      view.stars.addChangeListener(updateUserRating);
    },

    close: function() {
      view.imagelightbox.destroy();
    },

    serializeData: function() {
      return view.place;
    },

    showMenu: function(){
      vent.trigger('menu:show', 'home');
    },

    showHome: function() {
      vent.trigger('navigate', 'home');
    }

  });

  var updateUserRating = function(rating) {
    return serverGateway.place.post('/place/'+view.place.id+'/user/'+context.user.id+'/rating', { value : rating });
  };

  return view ;

});