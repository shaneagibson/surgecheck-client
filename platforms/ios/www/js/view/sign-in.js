define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/sign-in');

  var view = Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {

    }

  });

  return view;

});