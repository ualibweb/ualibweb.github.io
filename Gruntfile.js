module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        bwr: grunt.file.readJSON('.bowerrc'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',
        // Task configuration
        concat: {
            vendor_css: {
                src: [
                    '<%= bwr.directory %>/Yamm3/yamm/yamm.css',
                    '<%= bwr.directory %>/ualib-ui/dist/ui-components.css'
                ],
                dest: 'assets/css/vendor.css'
            },
            vendor_js: {
                src: [
                    '<%= bwr.directory %>/angular-strap/dist/angular-strap.min.js',
                    '<%= bwr.directory %>/angular-strap/dist/angular-strap.tpl.min.js',
                    '<%= bwr.directory %>/ualib-ui/dist/vendor.js',
                    '<%= bwr.directory %>/ualib-ui/dist/ualib-ui-templates.js',
                    '<%= bwr.directory %>/ualib-ui/dist/ualib-ui.js'
                ],
                dest: 'assets/js/vendor.js'
            }
        },
        bower_concat: {
            all: {
                dest: 'assets/js/bower.js',
                cssDest: 'assets/css/bower.css',
                include: [
                    'angular-strap',
                    'angular-scroll',
                    'ualib-ui'
                ],
                bowerOptions: {
                    relative: false
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        clean: {
            src: ['src/less/**']
        },
        copy: {
            less: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= bwr.directory %>',
                    src: [
                        'roots-ualib/**/*.less',
                        'ualib-ui/**/*.less'
                    ],
                    dest: 'assets/less/',
                    filter: 'isFile'
                }]
            },
            docs: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= bwr.directory %>',
                    src: [
                        'roots-ualib/**/docs/**/*',
                        'ualib-ui/**/docs/**/*',
                        '!**/*.less'
                    ],
                    dest: 'assets/less/docs/',
                    filter: 'isFile'
                }]
            },
            dist:{
                files: [{
                    expand: true,
                    cwd: 'src/assets',
                    src: ['**'],
                    dest: 'assets/',
                    filter: 'isFile'
                },{
                    src: ['src/index.html'],
                    dest: 'index.html',
                    options: {
                        process: true
                    }
                }]
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/ualibweb.github.io.min.js'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        less: {
            styleguide: {
                options: {
                    paths: ["src/template/public"]
                },
                files: {
                    "styleguide/public/ualib-styleguide.css": "src/template/public/ualib-styleguide.less"
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        },
        exec: {
            kss: {
                command: 'kss-node assets/less styleguide --template src/template --helpers src/template/helpers --custom codetemplate --custom hidemarkup --custom icon --custom menublurb'
            },
            prep: {
                command: 'bower update'
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-concat');

    // Default task
    grunt.registerTask('default', ['exec:kss', 'less', 'bower_concat', 'cssmin', 'copy:dist']);
    grunt.registerTask('build', ['prep', 'default']);
    grunt.registerTask('prep', ['exec:prep', 'copy:less', 'copy:docs']);
};

