define('view/payments', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/payments');
  var vent = require('../util/vent');
  var context = require('../context');
  var serverGateway = require('../util/server-gateway');
  var analytics = require('../util/analytics');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .edit-card' : 'editCard',
      'click .add-card' : 'addCard'
    },

    initialize: function(){
      analytics.trackView('Payments');
    },

    onDomRefresh: function() {
      serverGateway.payment.get('/payment/user/'+context.user.id+'/payment-method')
        .then(function(paymentMethods) {
          if (paymentMethods.length > 0) {
            context.paymentMethods = paymentMethods;
            paymentMethods.forEach(function (paymentMethod) {
              renderPaymentMethod(paymentMethod);
            });
          } else {
            $('.payment-methods').append('<div class="select-text center">No Cards Found</div>');
          }
        });
    },

    showMenu: function(){
      vent.trigger('menu:show', 'payments');
    },

    addCard: function(){
      vent.trigger('navigate', 'add-card');
    },

    editCard: function(e){
      var cardId = $(e.currentTarget).closest('.edit-card').data('cardid');
      vent.trigger('navigate', 'edit-card/'+cardId);
    }

  });

  var renderPaymentMethod = function(paymentMethod) {
    var resolveCardTypeCss = function(paymentMethod) {
      return paymentMethod.cardType.toLowerCase().replace(/ /g, '_');
    };
    var paymentMethodHtml =
      '<div data-cardid="'+paymentMethod.id+'" class="select-text edit-card touch-color">' +
      '<div class="card-image '+resolveCardTypeCss(paymentMethod)+'"></div>' +
      '<div class="card-summary">'+paymentMethod.type.toUpperCase()+' •••• '+paymentMethod.last4Digits+'<i class="icon-pencil"></i></div>' +
      '</div>';
    $('.payment-methods').append(paymentMethodHtml);
  };

  return view;

});