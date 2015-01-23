module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      'app/scripts/**/*.js',
      'tests/scripts/**/*.js',
      'test-main.js'
    ],
    exclude: [
      'app/scripts/index.js',
      'app/scripts/components/**/*.js'
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
