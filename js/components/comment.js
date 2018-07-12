/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-29 下午6:55
 * summary:
 */
define([
    'jquery',
    'zepto',
    'cookie',
    'infoChannel',
    'utilTool',
    'dog',
    'doT',
    'text!tpl/comment.tpl',
    'text!tpl/commentList.tpl',
    'text!tpl/commentAddItem.tpl',
    'text!tpl/columnNav.tpl',
    'text!tpl/footer.tpl'
], function (jquery,zepto, cookie, InfoChannel, UtilTool, dog, doT, commentTpl, commentListTpl, commentAddItemTpl, columnNavTpl, footerTpl) {
//设置url
    var url = configData.dataHost + '/index.php';
//获取URL参数
    var commentId = UtilTool.getUrlParam('commentid');
    var list=commentId.split('-');
    var catid=list[0].split('_')[1];
    var newsid=list[1];
//编译模版
    var commentTemplate = doT.template(commentTpl);//doT编译模版
    var commentListTemplate = doT.template(commentListTpl);//doT编译模版
    var commentAddItemTemplate = doT.template(commentAddItemTpl);//doT编译模版
    var columnNavTemplate = doT.template(columnNavTpl);//doT编译模版
    var footerTemplate = doT.template(footerTpl);//doT编译模版
//定义参数
    var commentParam = {
        m: 'mobileinfo',
        c: 'comment',
        a: 'commentdata',
        commentid: commentId
    };


    //绑定scroll事件.
    $(document).bind('scroll', onScroll);

//前端分页参数
    var start = 0;//数据开始位置
    var size = 6;//步长
    var end = size;//数据截至位置
    var dataSets = [];
    var initEventObj;
//***************正文************************************
    InfoChannel.getDataByAjax(url, commentParam, commentData);

    function commentData(data) {
        $('[data-attach-point=comment]').html(commentTemplate);
        dataSets = data.commentlist.comment;
        var dataList = dataSets.slice(start, end);
        $('.comment-List-ul').html(commentListTemplate(dataList));
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
        //***********评论回复-start********************************************************************
       initEventObj= function (){
            //发表
            var publishParam = {
                m: 'mobileinfo',
                c: 'newscomment',
                a: 'post',
                catid: catid,
                newsid: newsid,
                content: '',
                isreply: 0,
                comid: '',
                timestamp: Date.parse(new Date())
            };
            $('[data-attach-point=goWrite]').click(function () {
                var str = $(this).parent().prev('[data-attach-point=area]').val().trim();
                if (str !== ""&&$(this).hasClass("goWriteActive")) {
                    publishParam.content = str;
                    InfoChannel.getDataByAjax(url, publishParam);
                    location.reload();
                }
            });
            //取得焦点时
            $('[data-attach-point=area]').focus(function(){
                    $(this).css("color","#444444");
                }).blur(function(){
                if($(this).val()==""){
                    $(this).css("color","#d1d1d1");
                }
            });
            //若内容不为空则可发表
            $('[data-attach-point=area]').keyup(function(){
                if($(this).val()!=""){
                    $(this).next("div").find(".goWrite").addClass("goWriteActive");
                }else{
                    $(this).next("div").find(".goWrite").removeClass("goWriteActive");
                }
            });
            //点赞
            var pointParam = {
                m: 'mobileinfo',
                c: 'newscomment',
                a: 'support',
                commentid:commentId
            };
            $('[data-attach-point=point]').toggle(function (event) {
                    $(this).addClass('btn-upvote-act');
                    var count = Number($(this).attr('count'));
                    $(this).children('em').text(++count);
                    pointParam.id = $(this).attr('id');
                    pointParam.flag = 1;//加1
                    InfoChannel.getDataByAjax(url, pointParam);

                }, function () {
                    $(this).removeClass('btn-upvote-act');
                    var count = Number($(this).children('em').text());
                    $(this).children('em').text(--count);
                    pointParam.id = $(this).attr('id');
                    pointParam.flag = -1;//减1
                    InfoChannel.getDataByAjax(url, pointParam);
                }
            );
            //回复框显示与隐藏
            $('[data-attach-point=reply]').toggle(function () {
                var self = $(this).parent().next();
                if (self.css('display') === 'block') {
                    self.hide();
                } else {
                    self.show();
                }
            }, function () {
                var self = $(this).parent().next();
                if (self.css('display') === 'block') {
                    self.hide();
                } else {
                    self.show();
                }
            });
            //回复
            var self;
            $('[data-attach-point=goReply]').click(function () {
                self=$(this).parent().parent();
                self.hide();
                var str = $(this).parent().prev().val().trim();
                if (str) {
                    publishParam.content = str;
                    publishParam.isreply = 1;
                    publishParam.comid = $(this).attr('id');
                    InfoChannel.getDataByAjax(url, publishParam, renderData);
                    $(this).parent().prev().val('');
                }
            });
            function renderData(data) {
                self.parent().parent().next().prepend(commentAddItemTemplate(data));
            };
        };
       initEventObj();
    };


//*****************渲染底部**************************
    $('[data-attach-point=footer]').html(footerTemplate);

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
                    $('.comment-List-ul').append(commentListTemplate(dataArry));
                    initEventObj();
                } else {
                    setTimeout(setStyle(),0);
                }
            }
        }
    };

    function setStyle() {
        $('.loadMore').show();
        setTimeout("$('.loadMore').hide()",1000);
    };

//************************加载优化配置文件***************************************************
    require(['libConfig']);

})