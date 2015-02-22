define('view/landing', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/landing');
  var click = require('../util/click');
  var analytics = require('../util/analytics');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: 'div',

    template: template,

    events: {
      'click .register' : 'goToRegister',
      'click .sign-in' : 'goToSignIn'
    },

    initialize: function() {
      analytics.trackView('Landing');
    },

    goToRegister: click.single(function() {
      vent.trigger('navigate', 'register');
    }),

    goToSignIn: click.single(function() {
      vent.trigger('navigate', 'sign-in');
    }),

    onBack: function() {
      navigator.app.exitApp();
    }

  });

  return view ;

});