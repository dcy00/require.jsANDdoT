/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 15-11-23 下午6:00
 * summary:前端配置
 */

//*************禁止其它网站镜像********************
/*if (document.domain != 'touch.youde.com'){
    window.location.href='http://touch.youde.com';
}*/

//********用于访问前端*******************
var origin="http://"+window.location['host'];
var tempProjectName=window.location['pathname'];
var projectName=tempProjectName.split("/")[1];
window.clientPath=origin+"/"+projectName;//本地项目
console.log(window.clientPath);
//window.clientPath=origin;//服务端项目
//********用于访问服务端*******************
window.configData={
    /*数据服务---23测试库*/
     //dataHost:"http://zx.kmflsj.com"

    /*数据服务---210正试库*/
    dataHost:"http://zx.youde.com"

};

//*************配置require加载js路径*********************
require.config({
    baseUrl: window.clientPath+'/js/',
    waitSeconds: 0,
    paths: {
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
        searchTools:'components/searchTools'
    },
    /*
    *deps:依赖其它js
    * export:导出在其它文件中 import 引入
    */
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
    }
});



