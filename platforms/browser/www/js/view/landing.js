define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/landing');
  var click = require('../util/click');
  var vent = require('../util/vent');

  return Marionette.LayoutView.extend({

    tagName: 'div',

    template: template,

    events: {
      'click .register' : 'goToRegister',
      'click .sign-in' : 'goToSignIn'
    },

    goToRegister: function() {
      vent.trigger('navigate', 'register');
    },

    goToSignIn: function() {
      vent.trigger('navigate', 'sign-in');
    },

    onBack: function() {
      navigator.app.exitApp();
    }

  });

});