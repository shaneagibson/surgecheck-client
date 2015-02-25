define('util/hbs-helper/rating-stars', function(require) {

  var Handlebars = require('handlebars');

  return function (rating) {
    var html = '';
    for (var i = 0; i < 5; i++) {
      if (i + 1 < rating.user) {
        html += '<i class="icon-star user-star highlighted"></i>';
      } else {
        html += '<i class="icon-star user-star"></i>';
      }
      if (i + 1 < rating.average) {
        html += '<i class="icon-star average-star"></i>';
      } else if (i < rating.average && rating.average % 1 !== 0) {
        html += '<i class="icon-star-empty half average-star"></i><i class="icon-star-half average-star"></i>';
      } else {
        html += '<i class="icon-star-empty average-star"></i>';
      }
    }
    return new Handlebars.SafeString(html);
  };

});