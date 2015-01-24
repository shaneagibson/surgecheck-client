define('view/loading', function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/loading');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template

  });

  return view;

});