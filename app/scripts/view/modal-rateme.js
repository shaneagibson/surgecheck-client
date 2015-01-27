define('view/modal-rateme', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/modal-rateme');
  var vent = require('../util/vent');
  var rateme = require('../util/rateme');
  var config = require('../config');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .not-now' : 'onNotNow',
      'click .never' : 'onNever',
      'click .rate' : 'onRate'
    },

    onNotNow: function(){
      rateme.reset();
      vent.trigger('modal:hide');
    },

    onNever: function(){
      vent.trigger('modal:hide');
    },

    onRate: function(){
      window.open(config.app_store[device.platform], '_system');
      vent.trigger('modal:hide');
    }

  });

  return view;

});