module.exports = function (grunt) {

    var initConfig;

    // Loading external tasks
    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask('default', ['jshint', 'mochaTest', 'nodemon']);
    //grunt.registerTask('default', ['jshint', 'mocha']);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dist: 'dist',
        concat: {
        },
        uglify: {
        },
        clean: {
        },
        jshint: {
            files:['server/**/*.js', 'test/**/*Spec.js'],
            options: {
                curly   : true,
                eqeqeq  : true,
                immed   : true,
                latedef : true,
                newcap  : true,
                noarg   : true,
                sub  : true,
                boss    : true,
                eqnull  : true,
                smarttabs: true,
                globals : {}
            }
        },
        mocha: {
            test: {
                src: ['public/test/*.html'],
            },
        },  

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
        copy: {
        },
        nodemon: {
            dev: {
                script: 'server/app.js',
                options: {
                    args: [],
                    ignore: ['node_modules/**'],
                    ext: 'js,jade',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    cwd: __dirname
                }
            }
        },
    });
};
