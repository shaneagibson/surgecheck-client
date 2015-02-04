define('view/profile', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/profile');
  var vent = require('../util/vent');
  var click = require('../util/click');
  var context = require('../context');
  var toast = require('../util/toast');
  var analytics = require('../util/analytics');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .sign-out' : 'signOut'
    },

    onDomRefresh: function() {
      analytics.trackView('Profile');
    },

    showMenu: function(){
      vent.trigger('menu:show', 'profile');
    },

    signOut: click.single(function(){
      serverGateway
        .post('/account/logout', {
          sessionId: context.session.id
        })
        .then(function() {
          localStorage.removeItem('sessionid');
          delete context.user;
          delete context.session;
          vent.trigger('navigate', 'landing');
          toast.showShortBottom("Successfully Signed Out");
        })
        .catch(function(response) {
          analytics.trackError(JSON.stringify(response));
          toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    })

  });

  return view;

});