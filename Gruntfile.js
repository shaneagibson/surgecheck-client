module.exports = function(grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'www/js/**/*.js',
        '!www/js/components/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
 
};