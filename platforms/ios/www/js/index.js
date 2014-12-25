require.config({ baseUrl: "js" });

require(['app'], function(app) {
  'use strict';
  app.initialize();
});