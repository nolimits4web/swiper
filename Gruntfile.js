'use strict';
/*global require:true, module:false*/
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var swiper = {
        filename: 'idangerous.swiper'
    };

    // Project configuration.
    grunt.initConfig({
        swiper: swiper,
        // Metadata.
        pkg: grunt.file.readJSON('bower.json'),
        banner: '/*\n' +
            ' * Swiper <%= pkg.version %>\n' +
            ' * <%= pkg.description %>\n' +
            ' *\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright 2010-<%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
            ' * The iDangero.us\n' +
            ' * http://www.idangero.us/\n' +
            ' *\n' +
            ' * Licensed under <%= pkg.license.join(" & ") %>\n' +
            ' *\n' +
            ' * Released on: <%= grunt.template.today("mmmm d, yyyy") %>\n' +
            '*/\n',

        // Task configuration.
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ''
                }
            }
        },
        open: {
            tests: {
                path: 'http://localhost:3000/tests/'
            }
            
        },
        less: {
            build: {
                options: {
                    paths: ['less'],
                    cleancss: false
                },
                files: {
                    'build/css/<%= swiper.filename %>.css' : ['src/less/<%= swiper.filename %>.less']
                }
            },
            dist: {
                options: {
                    paths: ['less'],
                    cleancss: true
                },
                files: {
                    'dist/css/<%= swiper.filename %>.min.css' : ['src/less/<%= swiper.filename %>.less']
                }
            },
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,
                process: function (src, filename) {
                    if (filename.indexOf('.js') >= 0) {
                        var addIndent = '        ';
                        filename = filename.replace('src/js/', '');
                        if (filename === 'wrap-start.js' || filename === 'wrap-end.js') {
                            addIndent = '';
                        }
                        if (filename === 'swiper.js' || filename === 'dom.js' || filename === 'proto-start.js' || filename === 'proto-end.js') addIndent = '    ';
                        src = grunt.util.normalizelf(src);
                        return src.split(grunt.util.linefeed).map(function (line) {
                            return addIndent + line;
                        }).join(grunt.util.linefeed);
                    }
                    else return src;
                }
            },
            js: {
                src: [
                    'src/js/wrap-start.js',
                    'src/js/swiper.js',
                    'src/js/proto-start.js',
                    'src/js/proto-support.js',
                    'src/js/proto-end.js',
                    'src/js/dom.js',
                    'src/js/wrap-end.js'
                ],
                dest: 'build/js/<%= swiper.filename %>.js'
            },
            css_build: {
                src: ['build/css/<%= swiper.filename %>.css'],
                dest: 'build/css/<%= swiper.filename %>.css'
            },
            css_dist: {
                src: ['dist/css/<%= swiper.filename %>.min.css'],
                dest: 'dist/css/<%= swiper.filename %>.min.css'
            },
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['dist/js/<%= swiper.filename %>.js'],
                dest: 'dist/js/<%= swiper.filename %>.min.js',
            },
            rails: {
                src: ['dist_rails/javascripts/<%= swiper.filename %>.js'],
                dest: 'dist_rails/javascripts/<%= swiper.filename %>.min.js',
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: ['Gruntfile.js', 'build/js/<%= swiper.filename %>.js']
            }
        },
        watch: {
            build: {
                files: ['src/**'],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            },
            
        },
        
        copy: {
            
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: 'dist/'
                    }
                ]
            },
            
        },
    });

    // Default task.
    this.registerTask('default', ['build']);

    // Build a new version of the library
    this.registerTask('test', 'Test of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'concat:css_build',
        'jshint',
    ]);

    // Build a new version of the library
    this.registerTask('build', 'Builds a development version of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'concat:css_build',
        'jshint',
    ]);

    // Release
    this.registerTask('dist', 'Builds a distributable version of <%= pkg.name %>', [
        'concat:js',
        'less:build',
        'less:dist',
        'concat:css_build',
        'concat:css_dist',
        'jshint',
        'copy:dist',
        'uglify:dist'
    ]);


    // Server
    this.registerTask('server', 'Run server', [
        'connect',
        'open',
        'watch'
    ]);

};
