/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-23 上午10:07
 * summary:内容
 */
define([
    'jquery',
    'zepto',
    'cookie',
    'infoChannel',
    'utilTool',
    'dog',
    'doT',
    'text!tpl/content.tpl',
    'text!tpl/commentList.tpl',
    'text!tpl/commentAddItem.tpl',
    'text!tpl/columnNav.tpl',
    'text!tpl/footer.tpl'
], function (jquery, zepto, cookie, InfoChannel, UtilTool, dog, doT, contentTpl, commentListTpl, commentAddItemTpl, columnNavTpl, footerTpl) {
//设置url
    var url = configData.dataHost + '/index.php';
//获取URL参数
    var newsid = UtilTool.getUrlParam('id');
//编译模版
    var contentTemplate = doT.template(contentTpl);//doT编译模版
    var commentListTemplate = doT.template(commentListTpl);//doT编译模版
    var commentAddItemTemplate = doT.template(commentAddItemTpl);//doT编译模版
    var columnNavTemplate = doT.template(columnNavTpl);//doT编译模版
    var footerTemplate = doT.template(footerTpl);//doT编译模版
//定义参数
    var contentParam = {
        m: 'mobileinfo',
        c: 'content',
        a: 'contentdata',
        id: newsid
    }
//***************正文************************************
    InfoChannel.getDataByAjax(url, contentParam, contentData);

    function contentData(data) {
        $('[data-attach-point=content]').html(contentTemplate(data));
        $('.comment-List-ul').html(commentListTemplate(data.info.commentlist));
        //*********渲染关键字-start***************
        UtilTool.renderTitle(data.seoinfo);

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
        //推荐
        var chooseParam = {
            m: 'mobileinfo',
            c: 'content',
            a: 'consupport',
            id: newsid
        };
        $('[data-attach-point=choose]').toggle(function () {
            $('#alreadyzan').hide();
            $('#zan').show();
            var count = Number($(this).attr('count') || 0);
            $("#choose").text(++count);
            chooseParam.flag = 1;//加1
            InfoChannel.getDataByAjax(url, chooseParam);
        }, function () {
            $('#alreadyzan').show();
            $('#zan').hide();
            var count = Number($("#choose").text());
            $("#choose").text(--count);
            chooseParam.flag = -1;//减1
            InfoChannel.getDataByAjax(url, chooseParam);
        });
//***********评论回复-start********************************************************************
        //发表
        var publishParam = {
            m: 'mobileinfo',
            c: 'newscomment',
            a: 'post',
            catid: data.info.columninfo.catid,
            newsid: newsid,
            content: '',
            isreply: 0,
            comid: '',
            timestamp: Date.parse(new Date())
        };
        $('[data-attach-point=goWrite]').click(function () {
            var str = $(this).parent().prev('[data-attach-point=area]').val().trim();
            if (str !== "" && $(this).hasClass("goWriteActive")) {
                publishParam.content = str;
                InfoChannel.getDataByAjax(url, publishParam);
                location.reload();
            }
        });
        //取得焦点时
        $('[data-attach-point=area]').focus(function () {
            $(this).css("color", "#444444");
        }).blur(function () {
                if ($(this).val() == "") {
                    $(this).css("color", "#d1d1d1");
                }
            });
        //若内容不为空则可发表
        $('[data-attach-point=area]').keyup(function () {
            if ($(this).val() != "") {
                $(this).next("div").find(".goWrite").addClass("goWriteActive");
            } else {
                $(this).next("div").find(".goWrite").removeClass("goWriteActive");
            }
        });
        //点赞
        var pointParam = {
            m: 'mobileinfo',
            c: 'newscomment',
            a: 'support',
            commentid: data.info.comment.commentid
        }
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
            self = $(this).parent().parent();
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
        //渲染图片尺寸
        doImg();

    };

//*****************渲染底部**************************
    $('[data-attach-point=footer]').html(footerTemplate);

//处理图片大小
    function doImg() {
        var screen = parseFloat($("body").css("width")) - 24;
        $(".newsdetail-content img").each(function () {
            if (parseFloat($(this).css("width")) - screen > 0) {
                $(this).css({"width": screen + "px",
                    "height": "auto"
                });
            }
        })
    };

    //************************加载优化配置文件***************************************************
    require(['libConfig']);

})