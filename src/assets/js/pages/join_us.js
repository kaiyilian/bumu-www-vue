/**
 * Created by Administrator on 2016/6/28.
 */


var join_us = {

    init: function () {

        join_us.initPage();

        $(window).resize(function () {
            join_us.initPage();
        });

    },

    initPage: function () {

        //title_container  样式初始化
        var T_width = $(".title_container").width();
        var I_width = $(".title_container .sec_title").width();
        var left = (T_width - I_width) / 2;
        $(".title_container .sec_title").css("left", left);

        //职位列表点击 事件
        $(".post_container .post_name_list .post_name_item").each(function () {

            $(this).click(function () {
                $(this).addClass("active").siblings(".post_name_item").removeClass("active");
                var containerName = "." + $(this).attr("data-containerName");

                $(".post_container .post_content_list").find(containerName).show()
                    .siblings(".post_content_item").hide();

            });

        });

    }

};

$(function () {
    join_us.init();
});
