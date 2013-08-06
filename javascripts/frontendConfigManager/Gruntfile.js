module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),	
		concat: {
      			options: {
				stripBanners: true,
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
				src: ['src/namespace.js','src/**/*.js'],
				dest: 'core.js'
			}
		},

		jshint: {
			files: ['src/**/*.js'],
		    	options: {
				globals: {
			    		jQuery: true,
			    		console: true,
			    		module: true
				}
		    	}
		},

		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['concat']
		    	}
		}

	});

    	grunt.loadNpmTasks('grunt-contrib-jshint');
    	grunt.loadNpmTasks('grunt-contrib-concat');
    	grunt.loadNpmTasks('grunt-contrib-watch');
 
    	grunt.registerTask('default', ['concat','jshint']);
	
}

