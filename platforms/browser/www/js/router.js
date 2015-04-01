define('router', function(require) {

  var HomeView = require('./view/home');

  var touch = require('./util/touch');

  var exports = {

    initialize: function(app) {

      var AppRouter = Backbone.Router.extend({
        routes: {
          "home": "home"
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

      appRouter.on('route:home', function() { showView(new HomeView()); });

    }

  };

  return exports;

});