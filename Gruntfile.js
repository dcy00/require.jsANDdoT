/*global module*/
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            build: {
                options: {
                    appDir: './',
                    baseUrl: 'js',
                    dir: 'mobileZX',
                    /*optimize: 'uglify2',
                     generateSourceMaps: false,
                     preserveLicenseComments: false,*/
                    // useSourceUrl: true,
                    optimizeCss: 'standard',
                    paths: {
                        ready:"ext/domReady",
                        jquery:'ext/jquery-1.7.2.min',
                        jqueryJSON:'ext/jquery-json-2.4',
                        infoChannel:'ext/infoChannel',
                        utilTool: 'ext/utils',
                        text: 'ext/text',
                        doT:'ext/doT.min',
                        eventListen:'ext/on',
                        cookie:"ext/jquery.cookie",
                        dog:"ext/jquery.dog",
                        swiper:"ext/swiper.min",
                        zepto:"ext/zepto.min",
                        libConfig:'ext/libConfig',
                        searchTools:'components/1.0.1/searchTools'
                    },
                    shim: {
                        "jquery":{
                            exports: "jquery"
                        },
                        "zepto":{
                            exports: "zepto"
                        },
                        "jqueryJSON":{
                            deps: ['jquery'],
                            exports: "jqueryJSON"
                        },
                        "doT":{
                            exports: "doT"
                        },
                        "focusSlider":{
                            deps: ['jquery'],
                            exports: "focusSlider"
                        },
                        "cookie":{
                            deps: ['jquery'],
                            exports: "cookie"
                        },
                        "dog":{
                            deps: ['jquery'],
                            exports: "dog"
                        },
                        "swiper":{
                            deps: ['jquery'],
                            exports: "swiper"
                        }
                    },
                    modules: [
                        {name: 'components/1.0.1/index'},
                        {name: 'components/1.0.1/login'},
                        {name: 'components/1.0.1/zxList'},
                        {name: 'components/1.0.1/searchList'},
                        {name: 'components/1.0.1/content'},
                        {name: 'components/1.0.1/comment'}]
                }
            }
        },
        cssmin: {/*css压缩插件*/
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'css/build/youDe.css': ['css/src/*.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs'); //requirejs优化
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 注册任务
    grunt.registerTask('default', ['requirejs','cssmin']);
};