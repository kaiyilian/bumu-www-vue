/**
 * Created by Administrator on 2016/6/29.
 */


var entry = {

    init: function () {

        $(".block_1 .info_container .info").each(function () {
            $(this).hover(
                function () {
                    $(this).addClass("active").siblings(".info").removeClass("active");
                },
                function () {

                }
            )
        });

        entry.initPage();//初始化 页面

        $(window).resize(function () {
            // console.log("entry");
            entry.initPage();//初始化 页面
        });

    },

    //初始化 页面
    initPage: function () {

        //block_2 的padding设为0
        $(".block_2").css("padding", "0");

        var $w_width = $(window).width();
        var $w_content_width = document.body.clientWidth;
        var $width = $w_width > $w_content_width ? $w_width : $w_content_width;
        var content_width = 1000;

        //block 设置统一的宽度
        var $pad = ($width - content_width) / 2;

        var img_bg_height = $width * 360 / 1903;
        var $pad_top = (img_bg_height - 60 - 130) / 2;

        $(".block_2 .advantage_1").css({
            "height": img_bg_height,
            "padding-left": $pad,
            "padding-right": $pad,
            "padding-top": $pad_top
        });
        $(".block_2 .step_list .step_item").css({
            "padding-left": $pad,
            "padding-right": $pad
        })

    }
};


$(function () {
    entry.init();
});

// window.onload = function () {
//     window.onresize = function () {
//         // console.log("entry");
//         entry.initPage();
//
//     };
// };
