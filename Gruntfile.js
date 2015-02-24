module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',
        // Task configuration
        concat: {
            index: {
                src: 'src/index.html',
                dest: 'index.html',
                options: {
                    process: true
                }
            },
            vendor_css: {
                src: [
                    'bower_components/Yamm3/yamm/yamm.css'
                ],
                dest: 'assets/css/vendor.css'
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
        copy: {
            dist:{
                files: [{
                    src: ['src/assets/img/'],
                    dest: 'assets/img/',
                    filter: 'isFile'
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
        github:{
            ualibweb:{
                options: {
                    task: {
                        type: 'file'
                    }
                },
                src: '/repos/ualibweb/ualib-styles/contents/src/styles',
                dest: 'src/styles.json'
            }
        },
        exec: {
            kss: {
                command: 'kss-node src/less styleguide --template src/template --helpers src/template/helpers --custom codetemplate --custom hidemarkup'
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task
    grunt.registerTask('default', ['exec', 'less', 'concat', 'cssmin']);
};

