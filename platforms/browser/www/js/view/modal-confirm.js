define('view/modal-confirm', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/modal-confirm');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click .yes' : 'onYes',
      'click .no' : 'onNo'
    },

    onDomRefresh: function(){
      if (this.options.title) {
        $('.confirm .title').html(this.options.title);
      }
    },

    onYes: function(){
      this.options.yesCallback();
    },

    onNo: function(){
      if (this.options.noCallback) {
        this.options.noCallback();
      } else {
        vent.trigger('modal:hide');
      }
    }

  });

  return view;

});