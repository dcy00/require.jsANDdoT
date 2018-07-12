/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-23 上午10:07
 * summary:首页
 */
define([
    'jquery',
    'zepto',
    'cookie',
    'swiper',
    'infoChannel',
    'utilTool',
    'eventListen',
    'searchTools',
    'dog',
    'doT',
    'text!tpl/index.tpl',
    'text!tpl/columnNav.tpl',
    'text!tpl/footer.tpl'
], function (jquery,zepto,cookie, swiper, InfoChannel, UtilTool, EventListen, SearchTools,dog, doT, indexTpl, columnNavTpl, footerTpl) {


    //设置url
    var url = configData.dataHost + '/index.php';
    var indexTemplate = doT.template(indexTpl);//doT编译模版
    var columnNavTemplate = doT.template(columnNavTpl);//doT编译模版
    var footerTemplate = doT.template(footerTpl);//doT编译模版
    var indexParam = {
        m: 'mobileinfo',
        c: 'index',
        a: 'indexdata'
    };
//***************正文************************************
    InfoChannel.getDataByAjax(url, indexParam, indexData);

    function indexData(data) {
        console.log(data);
        //*********渲染关键字-start***************
        UtilTool.renderKeyWords(data.seoinfo);

        console.log(data.seoinfo);
        $('[data-attach-point=container]').html(indexTemplate(data));
        animationSwiper();//焦点图
        $('[data-attach-point=searchLink]').on('tap',function () {//转到搜索页
            $('[data-attach-point=container]').css('display', 'none');
            $('[data-attach-point=searchTools]').css('display', 'block');
            $('.searchPrompt').hide();
            $('[data-attach-point=searchEnter]').val('');
            //监听器
            SearchTools.renderSearchPage();
        });
        $('[data-attach-point=searchEnter]').on('input propertychange', (function() {//显示删除图标
            if($(this).val()!=''){
                $('[data-attach-point=clearSearchInput]').show();
            }
            if($(this).val()==''){
                $('[data-attach-point=clearSearchInput]').hide();
            }
        }));
        $('[data-attach-point=clearSearchInput]').on('tap', (function() {//显示删除图标
            if($('[data-attach-point=searchEnter]').val()!=''){
                $('[data-attach-point=searchEnter]').val("");
            }
            $(this).hide();
        }));
        //栏目导航
        $('[ data-attach-point=columnNav]').html(columnNavTemplate(data.nlist));
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
//显示与隐藏登录
        //获取参数
        //var code=$.dog.decode(UtilTool.getUrlParam('code'),'UTF-8');

        var code=UtilTool.getUrlParam('code');
        if(code===null){
            var username=$.cookie('username');//读取cookie
            if(username===null||username===undefined||username==='null'){
                $('#unLogin').show();
                $('#loginIn').hide();
            }else{
                $('#unLogin').hide();
                $('#loginIn').show();
            }

        }else{
            $('#unLogin').hide();
            $('#loginIn').show();
        }



    //***************搜索页***********************************
        $('[data-attach-point=You_prev]').click(function () {//返回
            $('[data-attach-point=searchTools]').css('display', 'none');
            $('[data-attach-point=container]').css('display', 'block');
        });


    //*****************渲染底部**************************
        $('[data-attach-point=footer]').html(footerTemplate);


    };
    //设置焦点图动效
    function animationSwiper() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-container .swiper-pagination',
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 3000,
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


    //************************加载优化配置文件***************************************************
    require(['libConfig']);
})