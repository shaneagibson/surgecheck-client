define('config', function(require){

  var exports = {
    google: {
      api_key: 'AIzaSyB9D3b_1JbIvma02g9eObLzEWr7k7nQFA0',
      project_number: 191982319122
    },
    uber: {
      client_id: 'ofSVzn8fJq92kFRENBy6aOD_fGyL6z3-'
    },
    server: {
      pricecheck: {
        scheme: 'http',
        host: '52.16.190.90',
        port: 8002
      }
    },
    mock: false
  };

  return exports;

});