module.exports = function(grunt) {

  grunt.registerTask('build:dev', [ 'clean', 'jshint:check', 'less:compile', 'concat:css', 'copy:dev' ]);
  grunt.registerTask('build:prod', [ 'clean', 'jshint:check', 'less:compile', 'requirejs', 'concat:css', 'copy:prod' ]);

  grunt.registerTask('run:browser', [ 'shell:browser' ]);
  grunt.registerTask('run:android', [ 'shell:android' ]);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: [
      "www/"
    ],

    jshint: {
      check: [
        'app/scripts/**/*.js',
        '!app/scripts/components/**/*.js'
      ]
    },

    less: {
      compile: {
        files: {
          'www/css/index.css': 'app/styles/less/**/*.less'
        }
      }
    },

    concat: {
      css: {
        files: {
          'www/css/index.css' : [
            'app/styles/**/*.css',
            'www/css/index.css'
          ]
        }
      }
    },

    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'app/scripts/',
            src: ['**'],
            dest: 'www/js/',
            filter: 'isFile'
          },
          {
            src: 'app/index.html',
            dest: 'www/index.html'
          }
        ]
      },
      prod: {
        files: [
          {
            src: 'app/index.html',
            dest: 'www/index.html'
          },
          {
            src: 'app/scripts/main.js',
            dest: 'www/js/main.js'
          },
          {
            src: 'app/scripts/components/rsvp/rsvp.min.js',
            dest: 'www/js/components/rsvp/rsvp.min.js'
          },
          {
            src: 'app/scripts/components/requirejs/require.js',
            dest: 'www/js/components/requirejs/require.js'
          }
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          name : 'app',
          baseUrl: "app/scripts/",
          mainConfigFile: "app/scripts/index.js",
          out: "www/js/index.js",
          include: ['index'],
          wrap: false,
          "optimize": "uglify2",
          "uglify2": {
            "mangle": true
          }
        }
      }
    },

    shell: {
      browser: {
        command: 'cordova run browser'
      },
      android: {
        command: 'cordova run android'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-shell');
 
};