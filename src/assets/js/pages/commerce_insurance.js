/**
 * Created by Administrator on 2016/6/30.
 */




var commerce_insurance = {

    init: function () {

        commerce_insurance.initPage();

    },

    initPage: function () {

        $(".block_3 .name_list .name_item").each(function () {
            $(this).click(function () {

                $(this).addClass("active").siblings(".name_item").removeClass("active");

                var contentName = $(this).attr("data-contentName");
                contentName = "." + contentName;

                $(".block_3 .package_content_list").find(contentName).addClass("active")
                    .siblings(".package_content_item").removeClass("active");

            });
        });

        $(".block_3 .package_content_list .package_content_item").each(function () {
            $(this).click(function () {

                $(this).addClass("active").siblings(".package_content_item").removeClass("active");

                var name = $(this).attr("data-name");
                name = "." + name;

                $(".block_3 .name_list").find(name).addClass("active")
                    .siblings(".name_item").removeClass("active");

            });
        });

    }
};

$(function () {

    commerce_insurance.init();

});
