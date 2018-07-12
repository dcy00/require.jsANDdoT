/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-29 下午7:04
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
    'doT',
    'text!tpl/zxList.tpl',
    'text!tpl/zxLoadMore.tpl',
    'text!tpl/footer.tpl'
], function (jquery, zepto, swiper, cookie, InfoChannel, UtilTool, dog, doT, zxListTpl, zxLoadMoreTpl, footerTpl) {
//设置url
    var url = configData.dataHost + '/index.php';
//获取URL参数
    var catId = UtilTool.getUrlParam('catid');
//编译模版
    var zxListTemplate = doT.template(zxListTpl);//doT编译模版
    var zxLoadMoreTemplate = doT.template(zxLoadMoreTpl);//doT编译模版
    var footerTemplate = doT.template(footerTpl);//doT编译模版
//定义参数
    var zxListParam = {
        m: 'mobileinfo',
        c: 'zxlist',
        a: 'zxlistdata',
        catid: catId
    };
//初始化数据
    $(document).ready(new function () {
        //绑定scroll事件.
        $(document).bind('scroll', onScroll);
    });
//前端分页参数
    var start = 0;//数据开始位置
    var size = 6;//步长
    var end = size;//数据截至位置
    var dataSets = [];
//***************正文************************************
    InfoChannel.getDataByAjax(url, zxListParam, zxListData);

    function zxListData(data) {
        //console.info(data);
        $('[data-attach-point=zxList]').html(zxListTemplate(data));
        animationSwiper();
        //栏目导航
        $('[data-attach-point=showList]').toggle(function () {
                $(this).addClass('hideList');
                $('[data-attach-point=columnNav]').css('display', 'block');
                $(".level").css('display', 'block');
            }, function () {
                $(this).removeClass('hideList');
                $('[data-attach-point=columnNav]').css('display', 'none');
                $(".level").css('display', 'none');
            }

        );
        dataSets = data.alllist;
        var dataList = dataSets.slice(start, end);
        $('.newsListUl').html(zxLoadMoreTemplate(dataList));
        //***************搜索页***********************************
        $('[data-attach-point=You_prev]').click(function () {
            $('[data-attach-point=searchTools]').css('display', 'none');
            $('[data-attach-point=container]').css('display', 'block');
        });
        //*****************渲染底部**************************
        //$('[data-attach-point=footer]').html(footerTemplate);

    };
    //设置焦点图动效
    function animationSwiper() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-container .swiper-pagination',
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            observer: true,
            observeParents: true,
            onInit: function (swiper) {
                $(".active-num").html(swiper.activeIndex + 1);
                $(".swipeLength").html(swiper.slides.length);
            },
            onSlideChangeEnd: function (swiper) {
                $(".active-num").html(swiper.activeIndex + 1);
            }
        });
    };


//***************前端分页***********************************
    /**
     * 滚动事件
     * @param event
     */

    function onScroll(event) {//定义滚动函数
        //是否到底部（这里是判断离底部还有100px开始载入数据）.
        var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
        if (closeToBottom) {
            if (dataSets.length !== end) {
                start = end;
                end = end + size;
                var dataArry = dataSets.slice(start, end);
                if (dataArry.length !== 0) {
                    $('.newsListUl').append(zxLoadMoreTemplate(dataArry))
                } else {
                    setTimeout(setStyle(), 0);
                }
            }
        }
    };

    function setStyle() {
        $('.loadMore').show();
        setTimeout("$('.loadMore').hide()", 1000);
    }


//************************加载优化配置文件***************************************************
    require(['libConfig']);
})