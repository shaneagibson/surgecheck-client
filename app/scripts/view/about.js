define('view/about', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/about');
  var vent = require('../util/vent');
  var rateme = require('../util/rateme');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .icon-menu' : 'showMenu',
      'click .terms-and-conditions' : 'showTermsAndConditions',
      'click .privacy-policy' : 'showPrivacyPolicy',
      'click .copyright' : 'showCopyright',
      'click .rate-us' : 'showRateUs'
    },

    onDomRefresh: function() {
      $('.version .number').html(config.version);
    },

    showMenu: function(){
      vent.trigger('menu:show', 'about');
    },

    showTermsAndConditions: function() {
      window.open('', '_system'); // TODO - update terms and conditions URL
    },

    showPrivacyPolicy: function() {
      window.open('', '_system'); // TODO - update privacy policy URL
    },

    showCopyright: function() {
      window.open('', '_system'); // TODO - update copyright URL
    },

    showRateUs: function(){
      rateme.openAppStore();
    }

  });

  return view;

});