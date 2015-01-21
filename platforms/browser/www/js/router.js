define(function(require) {

  var LandingView = require('./view/landing');
  var SignInView = require('./view/sign-in');
  var RegisterView = require('./view/register');
  var VerifyMobileView = require('./view/verify-mobile');
  var HomeView = require('./view/home');
  var ResetPasswordView = require('./view/reset-password');

  var touch = require('./util/touch');

  var exports = {

    initialize: function(app) {

      var AppRouter = Backbone.Router.extend({
        routes: {

          // in-app routes
          "landing": "landing",
          "sign-in": "signIn",
          "register": "register",
          "verify-mobile": "verifyMobile",
          "home": "home",

          // deep-links
          "user/:userid/forgottenpassword/token/:token": "resetPassword"

        }
      });

      var appRouter = new AppRouter();

      var showView = function(View, options) {
        app.main.show(new View(), options);
        touch.initializeTouchFeedback();
      };

      appRouter.on('route:landing', function() { showView(LandingView); });
      appRouter.on('route:signIn', function() { showView(SignInView); });
      appRouter.on('route:register', function() { showView(RegisterView); });
      appRouter.on('route:verifyMobile', function() { showView(VerifyMobileView); });
      appRouter.on('route:home', function() { showView(HomeView); });
      appRouter.on('route:resetPassword', function(userId, token) { showView(ResetPasswordView, { userId: userId, token: token }); });

    }

  };

  return exports;

});