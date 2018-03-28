/**
 * Created by Administrator on 2017/7/12.
 */


var header = {

    init: function () {

        $("header .navbar-btn").unbind("click").bind("click", function () {

            var type = $(this).attr("data-type");

            location.href = urlByType(type);//获取跳转链接

        });

        header.initHeader();//header 内容 初始化

        $(window).resize(function () {
            // console.log("header");
            header.initHeader();//header 内容 初始化
        });

    },

    //header 内容 初始化
    initHeader: function () {

        //获取页面 padding
        var $pad = common.pagePadding();

        //header  样式
        $("header .row").css({
            "padding-left": $pad,
            "padding-right": $pad
        });

    },

    //进入一键入职后台
    goKeySass: function () {
        location.href = "https://bumuyun.com/bran-admin/main";
    },

    //跳转到 申请试用 页面
    goTrailApply: function () {

        location.href = urlByType("trail_apply");//获取跳转链接

    },

    //跳转到 首页
    goIndex: function () {

        location.href = urlByType("index");//获取跳转链接

    },

    //跳转到 工资单 页面
    goSalaryPage: function () {

        _czc.push(["_trackEvent", "dianzigongzidan", "入口按钮"]);

        var host = location.host;
        if (host.indexOf("localhost") > -1) {       //本地路径 bran-core的端口
            $interface = "http://" + "localhost:8081" + "/";
        }
        else if (host.indexOf("248") > -1) {
            $interface = "http://192.168.12.220:9990/";
        }
        else if (host.indexOf("bumuyun") > -1) {
            $interface = "https://bumuyun.com/";
        }
        else {
            $interface = "https://bumuyun.com/";
        }

        location.href = $interface + "bran-admin/main";

    }

};

$(function () {

    header.init();

});
