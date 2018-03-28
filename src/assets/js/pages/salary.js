/**
 * Created by Administrator on 2016/6/30.
 */


var salary = {

    init: function () {

        salary.initPage();

        $(window).resize(function () {
            salary.initPage();
        });

    },

    //
    initPage: function () {

        //操作流程
        $(".content .block_4 .step_list .step_item").each(function () {

            var $index = $(this).index();
            var $content_height = 100 + $index * 40;//item中content的高度
            var top = ($(".content .block_4 .step_list .step_item").length - 1 - $index) * 40;
            $(this).css("top", top);

            $(this).find(".step_content").css("height", $content_height);

        });

    }

};

$(function () {

    salary.init();

});
