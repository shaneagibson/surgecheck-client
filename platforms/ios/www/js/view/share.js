define('view/share', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/share');
  var vent = require('../util/vent');
  var analytics = require('../util/analytics');
  var context = require('../context');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .share-via-email' : 'shareViaEmail',
      'click .share-via-sms' : 'shareViaSms'
    },

    initialize: function(){
      analytics.trackView('Share');
    },

    onDomRefresh: function(){
      $('.code').html(getPromoCode());
    },

    showMenu: function(){
      vent.trigger('menu:show', 'share');
    },

    shareViaEmail: function(){
      var promoCode = getPromoCode();
      var subject = titleMessage(promoCode);
      var body = bodyMessage(promoCode);
      window.open('mailto:?to=&subject='+subject+'&body='+body, '_system');
    },

    shareViaSms: function(){
      var promoCode = getPromoCode();
      var body = bodyMessage(promoCode);
      var handler = {
        android: function() {
          window.open('sms:?body='+body, '_system');
        },
        ios: function() {
          sms.sendMessage(body, console.log, console.log);
        },
        browser: function() { }
      };
      handler[device.platform.toLowerCase()]();
    }

  });

  var titleMessage = function(){
    return '£10 off your first Epsilon purchase!';
  };

  var bodyMessage = function(promoCode){
    return 'Use my Epsilon promo code '+promoCode+' and get £10 off your first Epsilon purchase!. Redeem it at https://www.epsilon.com/invite/'+promoCode;
  };

  var getPromoCode = function(){
    return context.user.inviteCode;
  };

  return view;

});