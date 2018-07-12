/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-2-17 下午1:51
 * summary:
 */
define([
    'jquery',
    'zepto',
    'cookie',
    'infoChannel',
    'utilTool'
], function (jquery,zepto, cookie, InfoChannel, utilTool) {
//设置url
    var url = configData.dataHost + '/index.php';

    $('#uc').on('tap',function(){
        $("#userName").val('');
    });
    $('#pwd').on('tap',function(){
        $("#password").val('');
    });



    $("#userName").bind('input propertychange',function(){
        $(this).parent("div").find("i").show();
        if (!tools.isnull($(this).val())) {
            $(this).parent("div").find("i").hide();
        }
    });

    $("#password").bind('input propertychange',function(){
        $(this).parent("div").find("i").show();
        if (!tools.isnull($(this).val())) {
            $(this).parent("div").find("i").hide();
        }
    });

    $("#userName").blur(function(){
        $(this).parent("div").find("i").hide();
    });

    $("#password").blur(function(){
        $(this).parent("div").find("i").hide();
    });
    $("#userName").focus(function(){
        $(this).parent("div").find("i").show();
    });

    $("#password").focus(function(){
        $(this).parent("div").find("i").show();
    });

    var tools={
        isnull:function(str){
            if(""!=str){
                return true;
            }
            return false;
        }
    };

    function getData(){//请求数据
        var loginParam = {
            m: 'mobileinfo',
            c: 'mymember',
            a: 'login',
            dosubmit: 1,
            username: $('#userName').val(),
            password: $('#password').val()
        }

        if(tools.isnull(loginParam.username)&&tools.isnull(loginParam.password)){
            InfoChannel.getDataByAjax(url, loginParam, loginBack);
        }
    };

    $('#password').keypress(function (event) {//键盘回车事件
        if (event.keyCode == "13") {
            getData();
        }
    });

    $('.isubmit-login').click(function(){//登录
            getData();
    });
    function loginBack(data) {
        //console.info(data);
        if (data.status !== 'error') {
            for (var i = 0, len = data.synloginstr.length; i < len; i++) {//加载登验证
                $('[data-attach-point=singleLogin]').append(data.synloginstr[i]);
            };
            $.cookie('username', data.username,{path: '/' });//写入cookie
            window.location.href='../index.html';
        } else {
            alert("登录失败，请检查用户名与密码")
        }
    };

    $('#qqLoginBtn').click(function(){
        window.location.href='https://graph.qq.com/oauth2.0/authorize?client_id=101259517&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.youde.com%2Fqqcallback.html?source=zx', 'oauth2Login_10802' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
    });

    //************************加载优化配置文件***************************************************
    require(['libConfig']);

})