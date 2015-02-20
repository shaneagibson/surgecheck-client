/**
 * 
 */
module.exports = function (grunt) {
	
	require('time-grunt')(grunt);
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-stonejs');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-dom-templates');
	
	grunt.initConfig({
		config: {
			directory: {
				tmp: '.tmp',
				app: 'app',
				scripts: 'app/scripts',
				_3rdparty: 'app/scripts/.3rd-party',
				styles: 'app/styles',
				templates: 'app/templates',
				build: '.build',
				test: 'test'
			}
		},
		
		connect: {
			dev: {
				options: {
					port: 8002,
					livereload: true,
					base: ['<%= config.directory.tmp %>', '<%= config.directory.app %>'],
					open: {
						target: 'http://localhost:8002'
					},
					middleware: function (connect, options, middlewares) {
						middlewares.unshift(function (req, resp, next) {
							//console.log('serve', req.url);
							return next();
						});
						
						return middlewares;
					}
				}
			},
			
			build: {
				options: {
					port: 8002,
					livereload: true,
					keepalive: false,
					base: ['<%= config.directory.build %>'],
					open: {
						target: 'http://localhost:8002'
					}
				}				
			}
		},
		
		watch: {
			html: {
				files: ['<%= config.directory.app %>/index.html'],
				options: { livereload: true },
			},
			
			scripts: {
				files: ['<%= config.directory.scripts %>/**/*.js', '<%= config.directory.test %>/**/*.js'],
				options: { livereload: true },
				tasks: ['jshint']
			},
			
			styles: {
				files: ['<%= config.directory.styles %>/**/*.scss'],
				tasks: ['sass']
			},
			
			css: {
				files: ['<%= config.directory.tmp %>/css/**/*.css'],
				options: { livereload: true }
			},
			
			build: {
				files: ['<%= config.directory.build %>/**/*.*'],
				options: { livereload: true }
			},
			
			dom_templates: {
				files: ['<%= config.directory.templates %>/**/*.html'],
				options: { livereload: true },
				tasks: ['dom_templates:compile']
			}
		},
		
		compass: {
			options: {
				sassDir: '<%= config.directory.styles %>',
				cssDir: '<%= config.directory.tmp %>/css'
			},
			dist: {}
		},
		
		sass: {
			options: {
				includePaths: ['<%= config.directory._3rdparty %>/compass-mixins/lib']
			},
			dist: {
				files: {
					'<%= config.directory.tmp %>/css/main.css': ['<%= config.directory.styles %>/main.scss']
				}
			}
		},
		
		jshint: {
			dist: {
				src: ['<%= config.directory.scripts %>/**/*.*js', '<%= config.directory.test %>/**/*.*spec.js']
			}
		},
		
		stonejs: {
			vent: {
				options: {
					stoneName: 'vent',
					configFile: 'scripts/app.js',
					baseDir: 'app/'
				},
				files: {
					'../dist/vent.js': 'services/event-bus/event-bus.js'
				}
			}			
		},
		
		requirejs: {
			dist: {
				options: {
					baseUrl: '<%= config.directory.scripts %>',
					mainConfigFile: '<%= config.directory.scripts %>/app.js',
					name: '.3rd-party/almond/almond', 
					include: ['app'],
					out: '<%= config.directory.build %>/scripts/app.js'
				}
			}
		},
		
		copy: {
			html: {				
				files: [{
					expand: true, cwd: '<%= config.directory.app %>', src: 'index.html', dest: '<%= config.directory.build %>'
				}]
			},
			images: {				
				files: [{
					expand: true, cwd: '<%= config.directory.app %>', src: 'images/**/*.*', dest: '<%= config.directory.build %>'
				}]
			},
			fonts: {				
				files: [{
					expand: true, cwd: '<%= config.directory.app %>', src: '.fonts/**/*.*', dest: '<%= config.directory.build %>'
				}]
			},
			data: {				
				files: [{
					expand: true, cwd: '<%= config.directory.app %>', src: 'data/**/*.*', dest: '<%= config.directory.build %>'
				}]
			}
		},
		
		cssmin: {
			build: {
				files: {
					'<%= config.directory.build %>/css/main.css': ['<%= config.directory.tmp %>/css/main.css']
				}
			}
		},
		
		uglify: {
			build: {
				files: [{
					expand: true, cwd: '<%= config.directory.app %>', src: 'scripts/.3rd-party/angularjs/angular.js', dest: '<%= config.directory.build %>'
				}, {
					expand: true, cwd: '<%= config.directory.app %>', src: 'scripts/.3rd-party/modernizr/modernizr.js', dest: '<%= config.directory.build %>'
				}, {
					expand: true, cwd: '<%= config.directory.app %>', src: 'scripts/.3rd-party/requirejs/require.js', dest: '<%= config.directory.build %>'
				}, {
					expand: true, cwd: '<%= config.directory.tmp %>/build', src: 'app.js', dest: '<%= config.directory.build %>/scripts'
				}]
			}
		},
		
		useminPrepare: {
			html: 'index.html'
		},
		
		usemin: {
			html: ['<%= config.directory.build %>/index.html'],
			css: ['<%= config.directory.build %>/css/*.css']
		},
		
		htmlmin: {
			build: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true					
				},
				files: [{
					expand: true, cwd: '<%= config.directory.build %>', src: 'index.html', dest: '<%= config.directory.build %>'
				}]
			}
		},
		
		filerev: {
			images: {
				src: '<%= config.directory.build %>/images/*.*'
			},
			js: {
				src: '<%= config.directory.build %>/scripts/*.js'
			},
			css: {
				src: '<%= config.directory.build %>/css/*.css'
			}
		},
		
		clean: {
			build: ['<%= config.directory.build %>']
		},
		
		ngtemplates: {
			options: {
				htmlmin: {
					collapseBooleanAttributes:      true,
					collapseWhitespace:             true,
					removeAttributeQuotes:          true,
					removeComments:                 true, // Only if you don't use comment directives!
					removeEmptyAttributes:          true,
					removeRedundantAttributes:      true,
					removeScriptTypeAttributes:     true,
					removeStyleLinkTypeAttributes:  true
				},
				bootstrap: function(module, script) {
					return "require(['ng-template-cache'], function ($templateCache) {\n" + script + "});";
				}
			},
			dev: {
				cwd: '<%= config.directory.app %>',
				src: 'templates/**/*.html',
				dest: '<%= config.directory.tmp %>/scripts/templates.js'
			},
			build: {
				cwd: '<%= config.directory.app %>',
				src: 'templates/**/*.html',
				dest: '<%= config.directory.app %>/scripts/templates.js'
			}
		},
		
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			dev: {
				//background:true,
				singleRun: true,
				reporters: 'dots'
			},
			unit: {
				singleRun: true,
				reporters: 'dots'
			}
		},
		
		jsdoc: {
			options: {
				destination: 'doc'
			},
			dist: {
				src: ['<%= config.directory.scripts %>/**/*.js']
			}
		},
		
		mochaTest: {
			options: {
				reporter: 'spec',
				require: [function () { 
					var webdriver = require('selenium-webdriver'); 
					driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build(); 
				}]
			},
			src: ['test/web/**/*.js']
		},
		
		dom_templates: {
			compile: {
				files: {
					'<%= config.directory.scripts %>/.compiled/templates.js': ['<%= config.directory.templates %>/**/*.html']
				}
			}
		}
	});
	
	grunt.registerTask('serve', ['sass', 'jshint', 'karma:dev', 'dom_templates:compile', 'connect:dev', 'watch']);
	grunt.registerTask('build', ['clean:build', 'useminPrepare', 'sass', 'jshint', 'karma:unit', 'dom_templates:compile', 'requirejs', 'copy', 'cssmin:build', 'filerev', 'usemin', 'htmlmin:build']);
	grunt.registerTask('serve-build', ['connect:build', 'watch:build']);
	grunt.registerTask('test', ['jshint', 'karma:unit']);
	grunt.registerTask('doc', ['jsdoc']);
};