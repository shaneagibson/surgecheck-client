define('view/friends', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/friends');
  var friendTemplate = require('hbs!../html/partial/friend-summary');
  var vent = require('../util/vent');
  var analytics = require('../util/analytics');
  var toast = require('../util/toast');
  var poller = require('../util/poller');
  var context = require('../context');
  var config = require('../config');
  var serverGateway = require('../util/server-gateway');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu'
    },

    initialize: function() {
      analytics.trackView('Friends');
    },

    onDomRefresh: function() {
      poller.create(function() { return context.contacts; }, 5000, 500).poll()
        .then(function() {
          renderContacts(context.contacts);
          var iscroll = $('#friends-iscroll-wrapper');
          iscroll.height($('body')[0].clientHeight - iscroll.offset().top);
          view.friendsIScroll = new IScroll('#friends-iscroll-wrapper', {
            scrollX: false,
            scrollY: true,
            momentum: false,
            snap: true,
            snapSpeed: 400,
            keyBindings: true,
            eventPassthrough: false,
            scrollbars: true
          });
        })
        .catch(function(error) {
          analytics.trackError(JSON.stringify(error));
          toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    },

    close: function(){
      if (view.friendsIScroll) {
        view.friendsIScroll.destroy();
        view.friendsIScroll = null;
      }
    },

    showMenu: function(){
      vent.trigger('menu:show', 'friends');
    }

  });

  var filterConnectedContacts = function(contacts) {
    return serverGateway.social.post('/social/user/'+context.user.id+'/contacts?type=phonenumber', contacts);
  };

  var renderContacts = function(contacts) {
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    ALPHABET.forEach(function(letter) {
      $('.friends').append('<li class="letter">'+letter+'</li>');
      contacts.filter(function(contact) { return contact.name[0] === letter; }).forEach(function(contact) {
        $('.friends').append(friendTemplate({ name: contact.name, phoneNumber: contact.phoneNumber }));
      });
    });
    return contacts;
  };

  return view;

});