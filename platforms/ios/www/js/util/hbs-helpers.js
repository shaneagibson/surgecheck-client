define('util/hbs-helpers', function(require) {

  var Handlebars = require('handlebars');

  Handlebars.registerHelper('rating-stars', require('./hbs-helper/rating-stars'));

  return Handlebars;

});