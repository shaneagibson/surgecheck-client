define('util/hbs-helpers', function(require) {

  var Handlebars = require('handlebars');

  Handlebars.registerHelper('user-stars', require('./hbs-helper/user-stars'));
  Handlebars.registerHelper('average-stars', require('./hbs-helper/average-stars'));

  return Handlebars;

});