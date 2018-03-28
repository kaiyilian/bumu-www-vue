/**
 * Created by Administrator on 2016/6/28.
 */



var about_us = {

    init: function () {

        about_us.initPage();

        $(window).resize(function () {
            about_us.initPage();
        });

    },

    //
    initPage: function () {

        var left = ($(".block_1").width() - $(".block_1 .cpm_culture").width()) / 2;
        $(".block_1 .cpm_culture").css("left", left);

    }

};

$(function () {

    about_us.init();

});
