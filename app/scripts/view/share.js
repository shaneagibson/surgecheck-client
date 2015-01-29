define('view/share', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/share');
  var vent = require('../util/vent');
  var context = require('../context');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .share-via-email' : 'shareViaEmail',
      'click .share-via-sms' : 'shareViaSms'
    },

    onDomRefresh: function(){
      $('.code').html(this.getPromoCode());
    },

    showMenu: function(){
      vent.trigger('menu:show', 'share');
    },

    shareViaEmail: function(){
      var promoCode = this.getPromoCode();
      var subject = this.titleMessage(promoCode);
      var body = this.bodyMessage(promoCode);
      window.open('mailto:?to=&subject='+subject+'&body='+body, '_system');
    },

    shareViaSms: function(){
      var promoCode = this.getPromoCode();
      var body = this.bodyMessage(promoCode);
      window.open('sms:?body='+body, '_system');
    },

    titleMessage: function(){
      return '£10 off your first Epsilon purchase!';
    },

    bodyMessage: function(promoCode){
      return 'Use my Epsilon promo code '+promoCode+' and get £10 off your first Epsilon purchase!. Redeem it at https://www.epsilon.com/invite/'+promoCode;
    },

    getPromoCode: function(){
      return context.user.inviteCode;
    }

  });

  return view;

});