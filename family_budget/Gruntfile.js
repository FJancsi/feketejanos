module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            dev: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['app/**/*.js', '!app/assets/libs/**/*.js']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['app/assets/style/*.scss'],
                        ext: '.css'
                    }
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 6 versions', 'ie 9']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['app/**/*.css', '!app/assets/libs/**/*.css']
                    }
                ]
            }
        },
        "bower-install-simple": {
            options: {
                color: true,
                directory: 'app/assets/libs/'
            },
            prod: {
                options: {
                    production: true
                }
            },
            dev: {
                options: {
                    production: false
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    atBegin: true
                }
            },
            scripts: {
                files: 'app/**/*.js',
                tasks: ['newer:jshint'],
                options: {
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['bower-install-simple', 'watch']);
    grunt.registerTask('install-packages', ['bower-install-simple']);
    grunt.registerTask('build', ['bower-install-simple', 'jshint', 'sass', 'autoprefixer']);
};
