define('view/profile', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/profile');
  var vent = require('../util/vent');
  var context = require('./context');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .sign-out' : 'signOut'
    },

    showMenu: function(){
      vent.trigger('menu:show', 'profile');
    },

    signOut: function(){
      delete context.user;
      delete context.session;
      // TODO - logout of account-service
      vent.trigger('menu:show', 'landing');
    }

  });

  return view;

});