define(function(require) {

  var LandingView = require('./view/landing');
  var SignInView = require('./view/sign-in');
  var RegisterView = require('./view/register');
  var VerifyMobileView = require('./view/verify-mobile');
  var touch = require('./util/touch');

  var exports = {

    initialize: function(app) {

      var AppRouter = Backbone.Router.extend({
        routes: {
          "landing": "landing",
          "sign-in": "signIn",
          "register": "register",
          "verify-mobile": "verifyMobile"
        }
      });

      var appRouter = new AppRouter;

      var showView = function(View) {
        app.main.show(new View());
        touch.initializeTouchFeedback();
      };

      appRouter.on('route:landing', function() { showView(LandingView); });
      appRouter.on('route:signIn', function() { showView(SignInView); });
      appRouter.on('route:register', function() { showView(RegisterView); });
      appRouter.on('route:verifyMobile', function() { showView(VerifyMobileView); });
    }

  };

  return exports;

});