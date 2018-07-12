/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-29 下午7:20
 * summary:
 */
define([
    'jquery',
    'zepto',
    'swiper',
    'cookie',
    'infoChannel',
    'utilTool',
    'dog',
    'searchTools',
    'doT',
    'text!tpl/searchList.tpl',
    'text!tpl/columnNav.tpl',
    'text!tpl/footer.tpl'
], function (jquery,zepto, swiper, cookie, InfoChannel, UtilTool, dog, searchTools, doT, searchListTpl,columnNavTpl, footerTpl) {
//设置url
    var url = configData.dataHost + '/index.php';
//获取URL参数
    var key = $.dog.decode(UtilTool.getUrlParam('key'), 'UTF-8');
    //console.info(key);
//编译模版
    var searchListTemplate = doT.template(searchListTpl);//doT编译模版
    var columnNavTemplate = doT.template(columnNavTpl);//doT编译模版
    var footerTemplate = doT.template(footerTpl);//doT编译模版
//定义参数
    var searchListParam = {
        m: 'mobileinfo',
        c: 'search',
        a: 'searchdata',
        userid: $.cookie("userid"),
        key: key
    };
//***************正文************************************

    InfoChannel.getDataByAjax(url, searchListParam, searchListData);
    function searchListData(data) {
        //console.info(data);
        $('[data-attach-point=searchList]').html(searchListTemplate(data));
        $('[data-attach-point=searchLink]').val(key);

        $('[data-attach-point=searchLink]').click(function () {//转到搜索页
            $('[data-attach-point=searchList]').css('display', 'none');
            $('[data-attach-point=searchTools]').css('display', 'block');
            $('[data-attach-point=searchEnter]').val(key);
            //监听器
            searchTools.renderSearchPage();
        });

    };

//***************搜索页***********************************
    $('[data-attach-point=You_prev]').click(function () {//返回
        $('[data-attach-point=searchTools]').css('display', 'none');
        $('[data-attach-point=searchList]').css('display', 'block');
    });

//*****************渲染底部**************************
    $('[data-attach-point=footer]').html(footerTemplate);

    //************************加载优化配置文件***************************************************
    require(['libConfig']);

})