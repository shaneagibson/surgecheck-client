define('util/hbs-helper/average-stars', function(require) {

  var Handlebars = require('handlebars');

  return function (averageRating) {
    var html = '';
    for (var i = 0; i < 5; i++) {
      if (i + 1 < averageRating) {
        html += '<i class="icon-star"></i>';
      } else if (i < averageRating && averageRating % 1 !== 0) {
        html += '<i class="icon-star-empty star-background"></i><i class="icon-star-half"></i>';
      } else {
        html += '<i class="icon-star-empty"></i>';
      }
    }
    return new Handlebars.SafeString(html);
  };

});