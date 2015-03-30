module.exports = function(grunt) {

  grunt.registerTask('build:dev', [ 'clean', 'jshint:check', 'karma:unit', 'less:compile', 'concat:css', 'copy:dev' ]);
  grunt.registerTask('build:prod', [ 'clean', 'jshint:check', 'karma:unit', 'less:compile', 'requirejs', 'concat:css', 'copy:prod', 'shell:build_release_ios', 'shell:verify_release_ios' ]);

  grunt.registerTask('run:browser', [ 'shell:deploy_browser' ]);
  grunt.registerTask('run:android', [ 'shell:deploy_android' ]);
  grunt.registerTask('run:ios', [ 'shell:deploy_debug_ios' ]);

  grunt.registerTask('run:test', [ 'karma:continuous' ]);

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
            'www/css/index.css',
            'app/scripts/components/swipebox/src/css/swipebox.min.css'
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
            expand: true,
            cwd: 'app/res/',
            src: ['**'],
            dest: 'www/res/',
            filter: 'isFile'
          },
          {
            src: 'app/index.html',
            dest: 'www/index.html'
          },
          {
            expand: true,
            cwd: 'app/images/',
            src: ['**'],
            dest: 'www/images/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'app/fonts/',
            src: ['**'],
            dest: 'www/fonts/',
            filter: 'isFile'
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
          },
          {
            expand: true,
            cwd: 'app/images/',
            src: ['**'],
            dest: 'www/images/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'app/fonts/',
            src: ['**'],
            dest: 'www/fonts/',
            filter: 'isFile'
          }
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          name : 'app',
          baseUrl: 'app/scripts/',
          mainConfigFile: 'app/scripts/index.js',
          out: 'www/js/index.js',
          include: ['index'],
          wrap: false,
          optimize: 'uglify2',
          preserveLicenseComments : false,
          inlineText : true
        }
      }
    },

    shell: {
      deploy_browser: {
        command: 'cordova run browser'
      },
      deploy_android: {
        command: 'cordova run android'
      },
      build_debug_ios: {
        command:
        'cordova build ios && ' +
        'cd platforms/ios && ' +
        'xcodebuild -scheme \'Surge Guard\' -configuration Debug -sdk iphoneos && ' +
        'cd ../..',
        options: {
          execOptions: {
            maxBuffer: Infinity
          }
        }
      },
      build_release_ios: {
        command:
        'cordova build ios && ' +
        'cd platforms/ios && ' +
        'xcodebuild -scheme \'Surge Guard\' -configuration Release -sdk iphoneos && ' +
        'cd ../..',
        options: {
          execOptions: {
            maxBuffer: Infinity
          }
        }
      },
      deploy_debug_ios: {
        command: '~/Development/Tools/fruitstrap/fruitstrap -b "/Users/shane/Library/Developer/Xcode/DerivedData/Surge\\ Guard-ayjltquvoopecnadwedexemncwmj/Build/Products/Debug-iphoneos/Surge\\ Guard.app"',
        options: {
          execOptions: {
            maxBuffer: Infinity
          }
        }
      },
      verify_release_ios: {
        command: 'xcrun -sdk iphoneos PackageApplication -v "/Users/shane/Library/Developer/Xcode/DerivedData/Surge\\ Guard-ayjltquvoopecnadwedexemncwmj/Build/Products/Release-iphoneos/Surge\\ Guard.app" -o "/Users/shane/Desktop/Surge\\ Guard.ipa" --sign "iPhone Distribution" --embed "/Users/shane/Downloads/Epsilon_Distribution.mobileprovision"',
        options: {
          execOptions: {
            maxBuffer: Infinity
          }
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      continuous: {
        configFile: 'karma.conf.js',
        autoWatch: true,
        singleRun: false
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
  grunt.loadNpmTasks('grunt-karma');

};