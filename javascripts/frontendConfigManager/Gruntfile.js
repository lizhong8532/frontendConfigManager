module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),	
		concat: {
      			options: {
				// stripBanners: true,
                		banner: '/** \n' +
                        		' * -------------------------------------------------------------\n' +
                        		' * Copyright (c) 2013 <%= pkg.name %>, All rights reserved. \n' +
                        		' *  \n' +
                        		' * @version: <%= pkg.version%> \n' +
                        		' * @author: <%= pkg.author%> \n' +
                        		' * @description: <%= pkg.description%> \n' +
					' * @project: <%= pkg.name %> \n' +
					' * @date: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                        		' * ------------------------------------------------------------- \n' +
                        		' */ \n\n'
      			},
			dist: {
				src: ['src/namespace.js','src/**/*.js', 'src/README'],
				dest: 'core.js'
			}
		},

		jshint: {
			files: ['src/**/*.js'],
		    	options: {

				curly: true,
				//eqeqeq: true,
				newcap: true,
				noarg: true,
				//sub: true,
				//undef: true,
				//node: true,
				evil:true,

                		globals: {
                    			jQuery: true
                		}
		    	}
		},

		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['concat']
		    	}
		},

		uglify: {
            		options : {
                		banner: '/** \n' +
                        		' * -------------------------------------------------------------\n' +
                        		' * Copyright (c) 2013 <%= pkg.name %>, All rights reserved. \n' +
                        		' *  \n' +
                        		' * @version: <%= pkg.version%> \n' +
                        		' * @author: <%= pkg.author%> \n' +
                        		' * @description: <%= pkg.description%> \n' +
					' * @project: <%= pkg.name %> \n' +
					' * @date: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                        		' * ------------------------------------------------------------- \n' +
                        		' */ \n\n'
            		},
            		build : {
                		src : 'core.js',
                		dest : 'core.min.js'
            		}
		}

	});

    	grunt.loadNpmTasks('grunt-contrib-jshint');
    	grunt.loadNpmTasks('grunt-contrib-concat');
    	grunt.loadNpmTasks('grunt-contrib-watch');
    	grunt.loadNpmTasks('grunt-contrib-uglify');
 
    	grunt.registerTask('default', ['concat','jshint']);
	
}

