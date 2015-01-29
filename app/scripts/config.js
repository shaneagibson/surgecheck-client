define('config', function(require){

  var exports = {
    google: {
      project_number: 830376253222,
      analytics_key: 'UA-XXXX-YY'
    },
    pushapps: {
      app_token: 'e6d5f5bd-5032-4172-be19-d7b41d67f1ef'
    },
    server: {
      scheme: 'http',
      host: '192.168.1.105',
      port: 8090
    },
    app_store: {
      android: '', // TODO - configure Play Store URL
      ios: '' // TODO - configure App Store URL
    },
    jumio: {
      app_key: '',
      app_secret: ''
    },
    mock: true,
    version: '0.0.1' // TODO - populate at build-time
  };

  return exports;

});