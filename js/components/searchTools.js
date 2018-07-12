/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-14 下午5:56
 * summary:搜索插件
 */
define([
    'jquery',
    'zepto',
    'infoChannel',
    'utilTool',
    'cookie',
    'jqueryJSON',
    'dog',
    'doT',
    'text!tpl/searchMatching.tpl'
], function (jquery,zepto, InfoChannel, UtilTool, cookie, jqueryJSON, dog, doT, searchMatchingTpl) {
//*******初始化搜索页面****************
    var userid;
//定义参数
    var param = {
        m: 'mobileinfo',
        c: 'search',
        a: 'searchpage'
    };
function hotData(data) {
    rendHotData(data.hotsearch);
};
//声明构造器
    function SearchTools() {
    };
    SearchTools.prototype.renderSearchPage = function () {
        //$('[data-attach-point=searchEnter]').val('');
        userid = $.cookie("userid");
        var list = $.cookie("keyList");
        //未登录
        if (userid === "null" || userid === undefined) {
            if (list === "[]" || list === undefined || list === "null") {
                $.cookie("keyList", $.toJSON(new Array()),{path: '/' });//初始化cookie信息
                //渲染热门推荐
                InfoChannel.getDataByAjax(url, param, hotData);
            } else {
                //渲染我的搜索
                var arr = $.cookie("keyList");
                var keyArry = jQuery.parseJSON(arr);
                rendMydata(keyArry);
                //渲染热门推荐
                InfoChannel.getDataByAjax(url, param, hotData);
            }
        //已登录
        } else {
            param.userid = userid;
            InfoChannel.getDataByAjax(url, param, myData);
            function myData(data) {
                var flag = true;
                rendMydata(data.mysearch, flag);
                rendHotData(data.hotsearch);
            }
        }
    };

//渲染我的搜索
    function rendMydata(data, flag) {
        $('.mySearchRecord').empty();
        for (var i = 0, len = data.length; i < len; i++) {//$.dog.encode(data[i].kwd,'UTF-8')

            if (flag) {
                var item = $.dog.encode(data[i].kwd, "UTF-8");
                var url = '/html/searchList.html?key=' + item;
                $('.mySearchRecord').append('<li><a href="' + clientPath + url + '">' + data[i].kwd + '</a></li>');
            } else {
                var item = $.dog.encode(data[i], "UTF-8");
                var url = '/html/searchList.html?key=' + item;
                $('.mySearchRecord').append('<li><a href="' + clientPath + url + '">' + data[i] + '</a></li>');
            }
        }
        ;
    };
//渲染热门搜索
    function rendHotData(data) {
        $('.hotSearchRecord').empty();
        for (var i = 0, len = data.length; i < len; i++) {
            var item = $.dog.encode(data[i].keyword, "UTF-8");
            var url = '/html/searchList.html?key=' + item;
            if (i == 0 || i == 1 || i == 2) {
                $('.hotSearchRecord').append('<li class="blue"><em>' + i + '</em><a href="' + clientPath + url + '">' + data[i].keyword + '</a></li>');
            } else {
                $('.hotSearchRecord').append('<li><em>' + i + '</em><a href="' + clientPath + url + '">' + data[i].keyword + '</a></li>');
            }
        }
    };
//清除历史记录
    $('.clearSearch').click(function () {
        if (userid === "null" || userid === undefined) {
            $.cookie("keyList", null,{path: '/' });
            $('.mySearchRecord').empty();
        } else {
            param.a = 'clearmysearch';
            param.userid = userid;
            InfoChannel.getDataByAjax(url, param, clearData);
            function clearData(data) {
                $('.mySearchRecord').empty();
            };

        }

    });

//*********搜索事件********************************************************
    SearchTools.prototype.setKeywords = function (key) {
        var userid = $.cookie("userid");
        if (userid === "null" || userid === undefined) {
            var arr = $.cookie("keyList");
            var keyArry = jQuery.parseJSON(arr);
            if (keyArry.length === 4) {
                keyArry.unshift(key);
                keyArry.pop();
                $.cookie("keyList", $.toJSON(keyArry),{path: '/' });//写入cookie
                //console.info(keyArry);
            } else {
                keyArry.unshift(key);
                $.cookie("keyList", $.toJSON(keyArry),{path: '/' });//写入cookie
                //console.info(keyArry);
            }
        }
    };


//*********************点击搜索****************************************************

//单击事件
    $('[data-attach-point=searchClick]').on('tap',function (event) {
        var val = $('#keyWord').val();
        if (val) {
            SearchTools.prototype.setKeywords(val);
            window.location.href = clientPath + '/html/searchList.html?key=' + $.dog.encode(val, 'UTF-8');
        }
        ;
    });
//键盘回车事件
    $('[data-attach-point=searchEnter]').keypress(function (event) {
        if (event.keyCode == "13") {
            var val = $(this).val();
            if (val) {
                SearchTools.prototype.setKeywords(val);
                window.location.href = clientPath + '/html/searchList.html?key=' + $.dog.encode(val, 'UTF-8');
            }
            ;
        }
    });
//*********************关键词匹配****************************************************
    //设置url
    var url = configData.dataHost + '/index.php';
    //设置参数
    var modelParam = {
        m: 'mobileinfo',
        c: 'search',
        a: 'sertipdata'
    };
    //编辑模版
    var searchMatchingTpl = doT.template(searchMatchingTpl);
    //键盘keyup事件
    $('[data-attach-point=searchEnter]').bind('input propertychange',function (event) {
        var keyVal = $(this).val();
        if (keyVal) {
            modelParam.key = keyVal;
            InfoChannel.getDataByAjax(url, modelParam, loadHint); //初始化导航数据
        }else{
            $('.searchPrompt').hide();
        }

    });
    function loadHint(data) {
        if(data.sertipdata.length!==0){
            $('.searchPrompt').html(searchMatchingTpl(data.sertipdata));
            $('.searchPrompt').show();
        }else{
            $('.searchPrompt').hide();
        };
        $('.searchPrompt>ul>li>a').click(function (event) {
            event.preventDefault();
            var kv = $(this).text();
            window.location.href = clientPath + '/html/searchList.html?key=' + $.dog.encode(kv, 'UTF-8');
        })
    };
    return new SearchTools();
})