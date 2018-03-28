/**
 * Created by Administrator on 2017/7/12.
 */

var $interface;

var social_insurance = {

    init: function () {
        // $("input").placeholder();

        social_insurance.initPage();

        $(window).resize(function () {
            social_insurance.initPage();
        });

    },

    //初始化 页面
    initPage: function () {

        var $w_width = $(window).width();
        var $w_content_width = document.body.clientWidth;
        var $width = $w_width > $w_content_width ? $w_width : $w_content_width;//页面宽度

        //banner图片宽高
        var banner_Height = $width * 450 / 1841;
        $(".content .block_1").css("height", banner_Height);

        //联系方式  bg
        var apply_bg_Height = $width * 550 / 1841;
        $(".content .block_6").css("height", apply_bg_Height);

    },

    //顶部 定位到 申请的位置
    goApply1: function () {
        _czc.push(["_trackEvent", "shebaodating", "顶部马上申请"]);
        $(window).scrollTop(2500);

        $(".apply_container .user_name").focus();
    },

    //底部 定位到 申请的位置
    goApply2: function () {
        _czc.push(["_trackEvent", "shebaodating", "底部马上申请"]);
        $(window).scrollTop(2500);

        $(".apply_container .user_name").focus();
    },

    //显示 联系信息
    toggleContactInfo: function () {
        var $info = $("footer").find(".foot_3 .contact_info");
        var $img = $("footer").find(".foot_3 .row .icon_up img");

        if ($info.is(":hidden")) {
            $info.show(500);
            $img.addClass("active");
        }
        else {
            $info.hide(500);
            $img.removeClass("active");
        }

    },

    //信息提交
    applySubmit: function () {
        _czc.push(["_trackEvent", "shebaodating", "提交"]);

        if (!social_insurance.checkParam()) {
            return
        }

        var $apply_container = $(".apply_container");
        var user_name = $.trim($apply_container.find(".user_name").val());
        var user_phone = $.trim($apply_container.find(".user_phone").val());
        var user_corp = $.trim($apply_container.find(".user_corp").val());

        var obj = {
            userName: user_name,
            tel: user_phone,
            corpName: user_corp,
            customerFrom: 1 //客户来源 0: 试用申请 1: 社保大厅 2: 客户商机 ,
        };

        var url = $interface + "corp/register" + "?" + jsonParseParam(obj);

        jsonp_get(
            url,
            function (data) {
                //alert(JSON.stringify(data))
                // console.log(data);

                if (data.code === RESPONSE_OK_CODE) {
                    toastr.success("我们已经收到你的信息，请保持手机通畅，客服人员将在24小时内进行人工回复！");

                    $apply_container.find(".user_name").val("");
                    $apply_container.find(".user_phone").val("");
                    $apply_container.find(".user_corp").val("");

                }
                else {
                    toastr.warning(data.msg);
                }

            },
            function (error) {
                // alert(JSON.stringify(error));
                // console.log(error);
                toastr.error("提交失败！");
            }
        )

    },
    //检查参数 是否为空
    checkParam: function () {

        var txt;
        var flag = false;

        var reg_phone = /^(13[0-9]|14[5|7]|15[^4]|17[6-8]|18[0-9])[0-9]{8}$/;

        var $apply_container = $(".apply_container");

        var user_name = $.trim($apply_container.find(".user_name").val());
        var user_phone = $.trim($apply_container.find(".user_phone").val());


        if (!user_name) {
            txt = "姓名不能为空！";
        }
        else if (!user_phone) {
            txt = "联系方式不能为空！";
        }
        else if (!reg_phone.test(user_phone)) {
            txt = "手机号格式不对！";
        }
        else {
            flag = true;
        }

        if (txt) {
            toastr.warning(txt);
        }

        return flag;

    }

};

$(function () {
    $interface = getInterface();//获取 URL前缀

    social_insurance.init();


});
