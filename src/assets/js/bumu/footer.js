/**
 * Created by Administrator on 2017/7/12.
 */


var footer = {

    init: function () {

        //加入我们、关于我们
        $("footer .foot_1 .left_side .btn_nav").unbind("click").bind("click", function () {

            var type = $(this).attr("data-type");

            location.href = urlByType(type);//获取跳转链接

        });

        //页面跳转
        $("footer .foot_1 .content_side .item").unbind("click").bind("click", function () {

            var type = $(this).attr("data-type");

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


    }

};

$(function () {
    footer.init();
});
