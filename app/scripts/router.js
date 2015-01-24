define('router', function(require) {

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

      var showView = function(view, options) {
        app.main.show(view, options);
        touch.initializeTouchFeedback();
      };

      appRouter.on('route:landing', function() { showView(new LandingView()); });
      appRouter.on('route:signIn', function() { showView(new SignInView()); });
      appRouter.on('route:register', function() { showView(new RegisterView()); });
      appRouter.on('route:verifyMobile', function() { showView(new VerifyMobileView()); });
      appRouter.on('route:home', function() { showView(new HomeView()); });
      appRouter.on('route:resetPassword', function(userId, token) { showView(new ResetPasswordView(), { userId: userId, token: token }); });

    }

  };

  return exports;

});