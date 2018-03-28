/**
 * Created by Administrator on 2016/6/24.
 */

var $interface;//接口 url 前缀
var $host;//页面 前缀

var common = {

    init: function () {

    },

    //获取页面 padding
    pagePadding: function () {

        var $w_width = $(window).width();
        var $w_content_width = document.body.clientWidth;
        var $width = $w_width > $w_content_width ? $w_width : $w_content_width;
        var content_width = 1000;

        //block 设置统一的宽度
        var $pad = ($width - content_width) / 2;

        return $pad;
    },

    //初始化
    commonInit: function () {

        //获取页面 padding
        var $pad = common.pagePadding();

        //block  样式
        $(".block").css({
            "padding-left": $pad,
            "padding-right": $pad
        });

    }

};

$(function () {

    // $interface = getInterface();//获取 接口 前缀
    $host = getHostForPage();//获取页面 前缀

    common.commonInit();//页面 内容 初始化

});
$(window).resize(function () {
    common.commonInit();//页面 内容 初始化
});

//获取跳转链接
var urlByType = function (type) {

    var url;

    switch (type) {
        case "index":       //首页
            url = "index.html";
            break;
        case "social":      //社保大厅
            url = "pages/social_insurance/social_insurance.html";
            break;
        case "entry":       //一键入职
            url = "pages/entry/entry.html";
            break;
        case "commerce":        //商业保险
            url = "pages/commerce_insurance/commerce_insurance.html";
            break;
        case "salary":      //薪资筹划
            url = "pages/salary/salary.html";
            break;
        case "about_us":      //关于我们
            url = "pages/about_us/about_us.html";
            break;
        case "join_us":      //加入我们
            url = "pages/join_us/join_us.html";
            break;
        case "trail_apply":      //申请试用  页面
            url = "trail_apply.html";
            break;
        default:            //首页
            url = "index.html";
            break;
    }

    return $host + url;

};

//获取 前缀
var getInterface = function () {
    // return "http://bumuyun.com.cn:8085/arya/";

    var host = location.host;
    if (host.indexOf("localhost") > -1) {       //本地路径 arya-core的端口
        $interface = "http://" + "localhost:8082" + "/";
    }
    else if (host.indexOf("248") > -1) {
        $interface = "http://192.168.13.248:5872/arya/";
    }
    else if (host.indexOf("bumuyun") > -1) {
        $interface = "http://bumuyun.com.cn:8085/arya/";
    }
    else {
        $interface = "http://bumuyun.com.cn:8085/arya/";
    }

    return $interface;

};

//获取 页面跳转 前缀
var getHostForPage = function () {

// debugger

    var host = location.host;
    if (host.indexOf("localhost") > -1) {       //本地路径 arya-core的端口
        host = "http://" + host + "/";
    }
    else if (host.indexOf("248") > -1) {
        host = "http://192.168.13.248/arya-www/";
    }
    else if (host.indexOf("bumuyun") > -1) {
        host = "http://bumuyun.com.cn/";
    }
    else {
        host = "http://bumuyun.com.cn/";
    }

    return host;

};

