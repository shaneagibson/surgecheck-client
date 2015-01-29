define('view/promotions', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/promotions');
  var vent = require('../util/vent');
  var click = require('../util/click');
  var validator = require('../util/validator');
  var serverGateway = require('../util/server-gateway');
  var context = require('../context');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .apply-promotion' : 'applyPromotion'
    },

    ui: {
      promotionCodeInput: '.promo-code'
    },

    showMenu: function(){
      vent.trigger('menu:show', 'promotions');
    },

    applyPromotion: click.single(function(){
      if (this.validateForm()) {
        this.submit();
      }
    }),

    validateForm: function() {
      return validator.validateFields($('.form').find('.field'));
    },

    submit: function() {
      return serverGateway
        .post('/user/'+context.user.id+'/redeem/'+view.ui.promotionCodeInput.val())
        .then(function() {
          vent.trigger('navigate', 'home');
          window.plugins.toast.showLongBottom('Successfully applied Promotion Code');
        })
        .catch(function(response) {
          switch (response.status) {
            case 400 : return window.plugins.toast.showLongBottom('Invalid Promotion Code.');
            case 409 : return window.plugins.toast.showLongBottom('This Promotion Code has already been redeemed.');
          }
          window.plugins.toast.showLongBottom('Something unexpected happened. Please try again.');
        });
    }

  });

  return view;

});