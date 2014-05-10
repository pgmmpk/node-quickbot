module.exports = function (grunt) {

    var initConfig;

    // Loading external tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task.
    grunt.registerTask('default', ['jshint', 'mochaTest']);
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
            files:['public/components/**/*.js', '*.js', 'test/**/*Spec.js', 'demo/**/*.js'],
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
        }
    });
};
