define('util/hbs-helper/user-stars', function(require) {

  var Handlebars = require('handlebars');

  return function (userRating) {
    var html = '';
    for (var i = 0; i < 5; i++) {
      if (i + 1 < userRating) {
        html += '<i class="icon-star highlighted"></i>';
      } else {
        html += '<i class="icon-star"></i>';
      }
    }
    return new Handlebars.SafeString(html);
  };

});
