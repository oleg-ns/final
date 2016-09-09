module.exports = function(grunt) {
	grunt.file.setBase("./");

	// 1. Общая конфигурация
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			buildDir: 'build',
			version: +new Date()
		},

		concat: {
			// 2. Настройки для склеивания файлов
			dist: {
				src: [
					'vendor/*.js', 'app/*.js', 'lib/*.js' // Все js-файлы в директории libs
				],
				dest: '<%= project.buildDir %>/app.js'
			}
		},

		less: {
			options: {
				//paths: [ 'app/css' ],
				compress: {},
				report: 'min',
				sourceMap: true
			},

			production: {
				files: {
					'<%= project.buildDir %>/app.css': ['vendor/*.css', 'css/*.less']
				}
			}
		},

		watch: {
			less: {
				files: ["css/*"],
				tasks: ["less"]
			},
			js: {
				files: "app/*",
				tasks: ["js", "clean:afterminjs"]
			},
			html: {
				files: ["index.html"],
				tasks: ["copy:html"]
			}
		},

		uglify: {
			options: {
				compress: {},
				preserveComments: 'some',
				report: 'min'
			},

			project: {
				src: '<%= project.buildDir %>/app.js',
				dest: '<%= project.buildDir %>/app.min.js'
			}
		},


		sprite:{
			all: {
				src: 'imges/*.png',
				dest: '<%= project.buildDir %>/images/icons.png',
				destCss: 'css/icons.css',
				imgPath: "img/icons.png"
			}
		},

		clean: {
			build: {
				src: ["<%= project.buildDir %>"]
			},

			afterminjs: {
				src: ["<%= project.buildDir %>/app.js"]
			}
		},

		postcss: {
			options: {
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			dist: {
				src: '<%= project.buildDir %>/app.css',
				dest: '<%= project.buildDir %>/app.css'
			}
		},
		copy: {
			html: {
				expand: true,
				src: ['index.html'],
				dest: '<%= project.buildDir %>/',
				//rename: function(dest, src) {
					// use the source directory to create the file
					// example with your directory structure
					//   dest = 'dev/js/'
					//   src = 'module1/js/main.js'
				//	return '<%= project.buildDir %>/index.html';
				//}
			},
			img: {
				expand: true,
				src: ['img/*.*'],
				dest: '<%= project.buildDir %>'
			}
		}

	});

	// 3. Сообщаем, какие плагины мы собираемся использовать

	// for less to css compiling
	grunt.loadNpmTasks('grunt-contrib-less');

	// watcher for files changing
	grunt.loadNpmTasks('grunt-contrib-watch');

	// for cleaning directories
	grunt.loadNpmTasks('grunt-contrib-clean');

	// for conating js files
	grunt.loadNpmTasks('grunt-contrib-concat');

	// for minifying js files
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// for jshint testing
	//grunt.loadNpmTasks('grunt-contrib-jshint');

	// for creating sprites
	grunt.loadNpmTasks('grunt-spritesmith');

	// for post processing css
	grunt.loadNpmTasks('grunt-postcss');

	grunt.loadNpmTasks('grunt-contrib-copy');

	// 4. Определяем задачу по умолчанию, которая будет выполняться при запуске команды grunt в терминале.
	
	grunt.registerTask('js', ['concat', 'uglify', 'clean:afterminjs']);

	grunt.registerTask('css', ['less', 'postcss']);

	grunt.registerTask('default', ['clean:build', 'js', 'sprite', 'css', 'copy', 'watch']);

};