define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/verify-mobile');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {

    }

  });

  return view;

});