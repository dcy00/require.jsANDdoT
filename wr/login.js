Zepto(function($){
     var mobile1=false,
         psw=false,
         i= 0,
         j=0;
    $("#changeBtn").on("click",function(){
        if(psw&&oldpsw&&repsw){
            changepass();
        }
        else{
            $(".error").text("输入有误").show();
        }
    });
    $(".isubmit-login").on("tap",function(){//登录提交
        if($("#userName").val()!=""&&tools.checkPass($("#password").val())){
            $(".isubmit-login").val("登录中...");
            $.post("/login.php",{username:$("#userName").val(),pwd:$("#password").val(),urlcontent:$("#urlcontent").val()},
                function(data){
                    if(data.status){
                        window.location.href=data.data.gotourl;
                    }
                    else{
                        $(".isubmit-login").val("登录");
                        $(".error").html("账户名或者密码不正确").show();
                    }
                },
                "json");
        }
        else if($("#userName").val()==""){
            $(".error").text("请输入账户名");
            $(".error").show();
        }
        else if(!tools.checkPass($("#password").val())){
            $(".error").text("请输入6-20位字母或数字");
            $(".error").show();
        }
    });
    $("#userName").blur(function(){
        $(this).parent("div").find("i").hide();
        if (tools.isnull($(this).val())) {
            $(".error").text("账户名不能为空");
            $(".error").show();
            mobile1 = false;
        }
    });
    $('.user_pass').blur(function(){
        if(tools.isnull($(this).val())) {
            $(".error").text("请输入密码");
            $(".error").show();
            psw=false;
        }else if(!tools.checkLength($(this).val())){
            $(".error").text("请输入6-20位字母或数字");
            $(".error").show();
            psw=false;
        }else if(!tools.checkPass($(this).val())){
            $(".error").text("请输入6-20位字母或数字");
            $(".error").show();
            psw=false;
        }else{
            $(".error").text("");
            $(".error").hide();
            psw=true;
        };
    });
    $('.log_type1>i').on('tap',function() {
        $(this).prev("input").val("");
        $(this).hide();
    });
    $('.log_type4>i').on('tap',function() {
        $(this).parents("div").find("input").val("");
        $(this).hide();
    });
});

var tools={
    isnull:function(str){
        if(""!=str){
            return false;
        }
        return true;
    },phoneCode:function(str){
        var reg=/^1[3|4|5|7|8]\d{9}$/;
        if(!reg.test(str)){
            return false;
        }
        return true;
    },checkLength:function(str){
        if(str.length<6||str.length>20){

            return false;
        }
        $(".error").text("");
        $(".error").hide();
        return true;
    },checkPass:function(str){
        var reg=/^[a-zA-Z0-9_]{6,20}$/;
        if(!reg.test(str)){
            $(".error").text("请输入6-20位字母或数字");
            $(".error").show();
            return false;
        }
        $(".error").text("");
        $(".error").hide();
        return true;
    }
};


