define('config', function(require){

  var exports = {
    google: {
      api_key: 'AIzaSyB9D3b_1JbIvma02g9eObLzEWr7k7nQFA0',
      project_number: 191982319122,
      analytics_key: 'UA-59788706-1'
    },
    pushapps: {
      app_token: 'e6d5f5bd-5032-4172-be19-d7b41d67f1ef'
    },
    server: {
      account: {
        scheme: 'http',
        host: '192.168.43.22',
        port: 8001
      },
      communication: {
        scheme: 'http',
        host: '192.168.43.22',
        port: 8002
      },
      payment: {
        scheme: 'http',
        host: '192.168.43.22',
        port: 8003
      },
      place: {
        scheme: 'http',
        host: '192.168.43.22',
        port: 8005
      },
      promotion: {
        scheme: 'http',
        host: '192.168.43.22',
        port: 8004
      },
      social: {
        scheme: 'http',
        host: '52.16.190.90',
        port: 8002
      }

    },
    app_store: {
      android: {
        name: 'Google Play',
        url: '' // TODO - configure Play Store URL
      },
      ios: {
        name: 'App Store',
        url: '' // TODO - configure App Store URL
      },
      browser: {
        name: 'App Store',
        url: 'http://mystore.com/app/123'
      }
    },
    jumio: {
      app_key: '',
      app_secret: ''
    },
    braintree: {
      cse_key: 'MIIBCgKCAQEAquZ3hNSxJAsuTnvu2Oov6gQhWizd+jY+dcMt4BkLZC/p5atg5OqCLHQaiAYPQsh3dI3Zw8WHgG1yvUrZd/syF0xF2U2DM5TBjmfENS1iG5mYVMzvWws61vVdxsLno4J/IEDwZ7PRuufi8O2baJFcngxIamGBKCIu4louvQPSX/NpA2huxjpviBlkWKPyC+LkSHiqq5hVu3q5MXz6jja0mHZT8s5tutoj/2E/Z6erNa7R4aMZdj64MaMXg+tdFeMpYabC48JH4zN6Q4taDZ5N8JUuSAqZdBaMu7chmjwrrvjpMjcInOn0tuw+9BlxUI3dvOfmSsU7Y9s107JwtTUHIQIDAQAB'
    },
<<<<<<< HEAD
    mock: true,
    version: '0.0.12' // TODO - populate at build-time
=======
    mock: false
>>>>>>> Updated surge graph to ensure line is rendered within y bounds
  };

  return exports;

});