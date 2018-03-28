/**
 * Created by CuiMengxin on 2016/8/23.
 */

var $interface;
// var $interface = "http://localhost:8080";
//var $interface = "http://192.168.13.248:5872/arya";//
//var $interface = "http://192.168.13.183:8084";//

var trail_apply = {

    apply_submit: function () {

        if (!trail_apply.checkParam()) {
            return
        }

        var $apply_container = $(".apply_container");
        var user_name = $.trim($apply_container.find(".user_name").val());
        var user_phone = $.trim($apply_container.find(".user_phone").val());
        var user_corp = $.trim($apply_container.find(".cpy_name").val());
        var remark = $.trim($(".remark").val());

        var obj = {
            userName: user_name,
            tel: user_phone,
            corpName: user_corp,
            leaveMessage: remark,
            customerFrom: 0 //客户来源 0: 试用申请 1: 社保大厅 2: 客户商机 ,
        };

        var url = $interface + "corp/register" + "?" + jsonParseParam(obj);

        jsonp_get(
            url,
            function (data) {
                //alert(JSON.stringify(data))
                // console.log(data);

                if (data.code === RESPONSE_OK_CODE) {

                    toastr.success("提交成功！");

                    $apply_container.find(".user_name").val("");
                    $apply_container.find(".user_phone").val("");
                    $apply_container.find(".cpy_name").val("");
                    $(".remark").val("");

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
        var cpy_name = $.trim($apply_container.find(".cpy_name").val());


        if (!user_name) {
            txt = "姓名不能为空！";
        }
        else if (!user_phone) {
            txt = "联系方式不能为空！";
        }
        else if (!reg_phone.test(user_phone)) {
            txt = "手机号格式不对！";
        }
        else if (!cpy_name) {
            txt = "企业名称不能为空！";
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

    var w_height = $(window).height();
    $(".wrapper").css("height", w_height);

    //block  样式
    $(".block").css({
        "padding-left": "0",
        "padding-right": "0"
    });

});