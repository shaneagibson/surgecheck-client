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
      'click .sign-out' : 'signOut',
      'click .profile-photo' : 'changePhoto'
    },

    initialize: function() {
      analytics.trackView('Profile');
      vent.on('photo', capturePhoto);
      serverGateway.account.get('/account/user/'+context.user.id+'/photo').then(renderProfilePhoto);
    },

    close: function() {
      vent.off('photo', capturePhoto);
    },

    showMenu: function(){
      vent.trigger('menu:show', 'profile');
    },

    signOut: click.single(function(){
      serverGateway.account.post('/account/logout', {
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
    }),

    changePhoto: click.single(function() {
      vent.trigger('modal:photo');
    })

  });

  var renderProfilePhoto = function(imageData) {
    $('.profile-photo').css('background-image', 'url("data:image/jpeg;base64,' + imageData+'")');
    $('.profile-photo .icon-user').hide();
  };

  var capturePhoto = function(imageData) {
    serverGateway.account.post('/account/user/'+context.user.id+'/photo', imageData, {}, 'image/jpeg')
      .then(function() {
        renderProfilePhoto(imageData);
      })
      .catch(function(response) {
        analytics.trackError(JSON.stringify(response));
        toast.showLongBottom('Something unexpected happened. Please try again.');
      });
  };

  return view;

});