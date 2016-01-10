module.exports = function(grunt) {

    var paths = {
        dev: 'scripts',
        prod: 'dist'
    };

    var fs = require('fs');

    var port = {
        dev: '3003',
        prod: '3003'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: paths,
        port: port,
        connect: {
            dev: {
                options: {
                    port: '<%= port.dev %>',
                    hostname: '0.0.0.0',
                    keepalive: true,
                    open: true,
                    base: ['.', 'scripts/content', 'vendor/requirejs']
                }
            },
            prod: {
                options: {
                    port: '<%= port.prod %>',
                    hostname: '0.0.0.0',
                    keepalive: true,
                    open: true,
                    base: ['<%= paths.prod %>']
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            dev: {
                src: [
                    '<%= paths.dev %>/content/css', '<%= paths.dev %>/content/fonts', '<%= paths.dev %>/**/*.css'
                ]
            },
            prod: {
                src: ['<%= paths.prod %>']
            },
            prod2: {
                src: ['<%= paths.prod %>/**/*.css', '!<%= paths.prod %>/css/*.css']
            },
            empty: {
                src: ['<%= paths.prod %>/**/*', '<%= paths.prod %>/*'],
                filter: function (path) {
                    return grunt.file.isDir(path) && fs.readdirSync(path).length === 0;
                }
            }
        },
        copy: {
            dev: {
                files: [
                    // fonts
                    {
                        expand: true,
                        flatten: true,
                        dot: true,
                        cwd: '.',
                        src: [
                            'vendor/typopro-web/web/TypoPRO-BukhariScript/*.woff'
                        ],
                        dest: '<%= paths.dev %>/content/css/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        dot: true,
                        cwd: '.',
                        src: [
                            'libs/fonts/*.{woff,ttf}'
                        ],
                        dest: '<%= paths.dev %>/content/css/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        dot: true,
                        cwd: '.',
                        src: [
                            'vendor/bootstrap/fonts/*.{woff,woff2}'
                        ],
                        dest: '<%= paths.dev %>/content/css/'
                    }
                ]
            },
            prod: {
                files: [
                    // fonts
                    {
                        expand: true,
                        flatten: true,
                        dot: true,
                        cwd: '.',
                        src: [
                            'vendor/typopro-web/web/TypoPRO-BukhariScript/*.woff'
                        ],
                        dest: '<%= paths.prod %>/css/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        dot: true,
                        cwd: '.',
                        src: [
                            'libs/fonts/*.{woff,ttf}'
                        ],
                        dest: '<%= paths.prod %>/css/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        dot: true,
                        cwd: '.',
                        src: [
                            'vendor/bootstrap/fonts/*.{woff,woff2}'
                        ],
                        dest: '<%= paths.prod %>/css/'
                    },
                    // index.html
                    {
                        cwd: '.',
                        src: 'index.html',
                        dest: '<%= paths.prod %>/'
                    },
                    // content
                    {
                        cwd: '.',
                        src: ['scripts/**/*.html'],
                        dest: '<%= paths.prod %>/'
                    },
                    {
                        cwd: '.',
                        src: ['img/**'],
                        dest: '<%= paths.prod %>/'
                    },
                    // require.js
                    {
                        cwd: '.',
                        src: ['vendor/requirejs/require.js'],
                        dest: '<%= paths.prod %>/require.js'
                    }
                ]
            }
        },
        less: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= paths.dev %>",
                        src: ['**/*.less'],
                        dest: '<%= paths.dev %>',
                        ext: '.css'
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= paths.dev %>",
                        src: ['**/*.less'],
                        dest: '<%= paths.prod %>',
                        ext: '.css'
                    }
                ]
            }
        },
        sass: {
            options: {
                loadPath: ['vendor/foundation/scss']
            },
            dev: {
                options: {
                    sourcemap: 'none',
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'scripts',
                    src: ['**/*.scss'],
                    dest: '<%= paths.dev %>/content/css/',
                    ext: '.css'
                }]
            },
            prod: {
                options: {
                    sourcemap: 'none',
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'scripts',
                    src: ['**/*.scss'],
                    dest: '<%= paths.prod %>',
                    ext: '.css'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            dev: {
                src: ['<%= paths.dev %>/**/*.css'],
                dest: '<%= paths.dev %>/content/css/styles.css',
            },
            prod: {
                src: ['<%= paths.prod %>/**/*.css'],
                dest: '<%= paths.prod %>/css/styles.css',
            }
        },
        requirejs: {
            options: {
                name: 'main',
                baseUrl: 'scripts',
                mainConfigFile: 'scripts/main.js',
                out: '<%= paths.prod %>/scripts/main.js',
                optimize: 'none',
                almond: true,
                preserveLicenseComments: false,
                useStrict: true,
                wrap: true,
                findNestedDependencies: true,
                paths: {}
            },
            dist: {}
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: '<%= paths.prod %>/scripts/main.js',
                        extDot: 'last'
                    }
                ]
            }
        },
        uglify: {
            options: {
                compress: {
                    sequences: false,
                    dead_code: false,
                    drop_debugger: false,
                    comparisons: false,
                    conditionals: false,
                    evaluate: false,
                    booleans: false,
                    loops: false,
                    if_return: false,
                    join_vars: false,
                    drop_console: false
                }
            },
            requirejs: {
                files: {
                    '<%= paths.prod %>/require.js': ['<%= paths.prod %>/require.js'],
                    '<%= paths.prod %>/scripts/main.js': ['<%= paths.prod %>/scripts/main.js']
                }
            }
        },
        htmlmin: {
            options: {
                collapseWhitespace: true
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.prod %>',
                        src: '**/*.html',
                        dest: '<%= paths.prod %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.prod %>',
                        src: '**/*.css',
                        dest: '<%= paths.prod %>'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');



    grunt.registerTask('prod', [
        'clean:prod',       // clean dist dir
        'copy:prod',        // copy content
        'less:prod',        // generate css files
        /*'sass',*/
        'concat:prod',      // concat css files into one
        'clean:prod2',      // clean unused css files
        'clean:empty',      // remove empty dirs
        'requirejs',        // generate require.js
        'connect:prod'      // start server
    ]);

    grunt.registerTask('prod.min', [
        'clean:prod',       // clean dist dir
        'copy:prod',        // copy content
        'less:prod',        // generate css files
        /*'sass',*/
        'concat:prod',      // concat css files into one
        'clean:prod2',      // clean unused css files
        'clean:empty',      // remove empty dirs
        'requirejs',        // generate require.js
        'ngAnnotate',       // annotate Angular files before uglifying
        'uglify',           // uglify js files
        'htmlmin',          // minimize css and html
        'connect:prod'      // start server
    ]);

    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',
        'less:dev',
        /*'sass:dev',*/
        'concat:dev',
        'connect:dev'
    ]);
};