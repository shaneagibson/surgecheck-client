define(function(require) {

  var Marionette = require('marionette');
  var template = require('hbs!../html/sign-in');

  return Marionette.LayoutView.extend({

    tagName: "div",

    template: template,

    events: {

    }

  });

});