define('router', function(require) {

  var LandingView = require('./view/landing');
  var SignInView = require('./view/sign-in');
  var RegisterView = require('./view/register');
  var VerifyMobileView = require('./view/verify-mobile');
  var HomeView = require('./view/home');
  var ResetPasswordView = require('./view/reset-password');
  var AboutView = require('./view/about');
  var PaymentsView = require('./view/payments');
  var ProfileView = require('./view/profile');
  var PromotionsView = require('./view/promotions');
  var ShareView = require('./view/share');
  var SupportView = require('./view/support');
  var AddCardView = require('./view/add-card');
  var EditCardView = require('./view/edit-card');
  var ForgottenPasswordView = require('./view/forgotten-password');
  var PlaceView = require('./view/place');
  var FriendsView = require('./view/friends');
  var AddVenueView = require('./view/add-venue');

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
          "about": "about",
          "payments": "payments",
          "profile": "profile",
          "promotions": "promotions",
          "share": "share",
          "support": "support",
          "add-card": "addCard",
          "forgotten-password": "forgottenPassword",
          "edit-card/:cardid": "editCard",
          "place/:placeid": "place",
          "friends": "friends",
          "add-venue": "addVenue",

          // deep-links
          "user/:userid/forgottenpassword/token/:token": "resetPassword"

        }
      });

      var appRouter = new AppRouter();

      var showView = function(view, options) {
        if (app.main.currentView && app.main.currentView.close) {
          app.main.currentView.close();
        }
        app.main.show(view, options);
        touch.initializeTouchFeedback();
      };

      appRouter.on('route:landing', function() { showView(new LandingView()); });
      appRouter.on('route:signIn', function() { showView(new SignInView({ blah: 'blah'})); });
      appRouter.on('route:register', function() { showView(new RegisterView()); });
      appRouter.on('route:verifyMobile', function() { showView(new VerifyMobileView()); });
      appRouter.on('route:home', function() { showView(new HomeView()); });
      appRouter.on('route:about', function() { showView(new AboutView()); });
      appRouter.on('route:payments', function() { showView(new PaymentsView()); });
      appRouter.on('route:profile', function() { showView(new ProfileView()); });
      appRouter.on('route:promotions', function() { showView(new PromotionsView()); });
      appRouter.on('route:share', function() { showView(new ShareView()); });
      appRouter.on('route:support', function() { showView(new SupportView()); });
      appRouter.on('route:addCard', function() { showView(new AddCardView()); });
      appRouter.on('route:editCard', function(cardId) { showView(new EditCardView({ cardId: cardId })); });
      appRouter.on('route:forgottenPassword', function() { showView(new ForgottenPasswordView()); });
      appRouter.on('route:resetPassword', function(userId, token) { showView(new ResetPasswordView(), { userId: userId, token: token }); });
      appRouter.on('route:place', function(placeId) { showView(new PlaceView({ placeId: placeId })); });
      appRouter.on('route:friends', function() { showView(new FriendsView()); });
      appRouter.on('route:addVenue', function() { showView(new AddVenueView()); });

    }

  };

  return exports;

});