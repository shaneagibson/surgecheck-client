define('view/profile', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/profile');
  var vent = require('../util/vent');
  var context = require('../context');
  var serverGateway = require('../util/server-gateway');

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
      serverGateway
        .post('/account/logout', {
          sessionId: context.session.id
        })
        .then(function() {
          localStorage.removeItem('sessionid');
          delete context.user;
          delete context.session;
          vent.trigger('navigate', 'landing');
        })
        .catch(function() {
          window.plugins.toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});