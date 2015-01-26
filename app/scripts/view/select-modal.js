define('view/select-modal', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/select-modal');
  var vent = require('../util/vent');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {
      'click li' : 'selectOption'
    },

    onDomRefresh: function(){
      for (var i = 0; i < this.options.keys.length; i++) {
        var key = this.options.keys[i];
        var value = this.options.values[i];
        var isSelected = this.options.selected === key;
        var optionHtml = '<li class="touch-color option'+(isSelected?' selected':'')+'" data-key="'+key+'" data-value="'+value+'">'+value+'<i class="right icon-ok"></i></li>';
        $('#modal ul.select').append(optionHtml);
      }
    },

    selectOption: function(e){
      var option = $(e.currentTarget).closest('li');
      this.options.callback(option.data('key'), option.data('value'));
      vent.trigger('modal:hide');
    }

  });

  return view;

});