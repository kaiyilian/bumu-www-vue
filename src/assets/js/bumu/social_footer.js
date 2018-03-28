/**
 * Created by Administrator on 2017/7/14.
 */


var footer = {

    init: function () {

        //加入我们、关于我们
        $("footer .foot_1 .left_side .info .line").unbind("click").bind("click", function () {

            var type = $(this).attr("data-type");

            if (type) {
                location.href = urlByType(type);//获取跳转链接
            }

        });

        //页面跳转
        $("footer .foot_1 .right_side .info .item").unbind("click").bind("click", function () {

            var type = $(this).attr("data-type");
            if (type)
                location.href = urlByType(type);//获取跳转链接

        });

        footer.initFooter();//footer 内容 初始化

        $(window).resize(function () {
            // console.log("footer");
            footer.initFooter();//footer 内容 初始化
        });

    },

    //footer 内容 初始化
    initFooter: function () {

        //获取页面 padding
        var $pad = common.pagePadding();

        //foot 样式
        $("footer .foot_1").css({
            "padding-left": $pad,
            "padding-right": $pad
        });

        $("footer .foot_3").css({
            "padding-left": $pad,
            "padding-right": $pad
        });

    }

};

$(function () {
    footer.init();
});

//监控 底部弹框显示
$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    scrollTop = isNaN(parseInt(scrollTop)) ? 0 : parseInt(scrollTop);

    // if (scrollTop >= 450) {
    //     $("footer .foot_3").show();
    // }
    // else {
    //     $("footer .foot_3").hide();
    // }

    var $foot_3 = $("footer .foot_3");

    if (scrollTop < 450) {
        $foot_3.hide("1000");
        // $foot_3.find(".icon_up .active").removeClass("active");//隐藏 icon ，icon 向上
    }
    // else if (scrollTop > 1800) {
    //     $foot_3.find(".contact_info").hide("1000");
    //     $foot_3.find(".icon_up .active").removeClass("active");//隐藏 icon ，icon 向上
    // }
    else {
        $foot_3.show("1000");
        // $foot_3.find(".contact_info").show("1000");

        if ($foot_3.find(".contact_info").is(":hidden")) {
            $foot_3.find(".icon_up .active").removeClass("active");//隐藏 icon ，icon 向上
        }
        else {
            $foot_3.find(".icon_up img").addClass("active");//显示 icon，active 乡下
        }

    }

    console.log(scrollTop);

});