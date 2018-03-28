/**
 * Created by Administrator on 2016/6/24.
 *
 */

// var $interface;

var mySwiper;

var index = {

    init: function () {

        index.pageInit(); //页面初始化
        index.bannerListInit(); //banner 初始化
        index.customerImgInit(); //我们的客户 img 初始化

        //数字动态增加
        var tur = true;
        $(window).scroll(function () {
            if ($(window).scrollTop() > 50) {
                if (tur) {
                    setTimeout(function () {
                        index.countInit();
                    }, 500);
                    tur = false;
                }
                else {
                }
            }
        });
        if ($(window).height() > 645 && tur) {
            setTimeout(function () {
                index.countInit();
            }, 500);
            tur = false;
        }

        $(window).resize(function () {
            index.pageInit();
        });

    },

    //页面初始化
    pageInit: function () {
        var $w_width = $(window).width();
        var $w_content_width = document.body.clientWidth;
        var $width = $w_width > $w_content_width ? $w_width : $w_content_width;

        //banner图片宽高
        var banner_Height = $width * 592 / 1903;
        $(".content .banner_list").css("height", banner_Height);

        //"为什么选择我们" 内容样式
        $(".content .choose_us_reason_container .list .item").each(function () {
            var item_width = $(this).width();
            var spn_1_width = $(this).find(".spn_1").width();

            var left = (item_width - spn_1_width) / 2;
            $(this).find(".spn_1").css("left", left);

        });

        //"我们的服务" 内容样式
        $(".content .our_service_container .service_name_list .service_name_item").each(function () {

            $(this).click(function () {
                $(this).addClass("active").siblings(".service_name_item").removeClass("active");

                var name = $(this).attr("data-cotainerName");

                $(".content .our_service_container").find("." + name).show()
                    .siblings(".service_container").hide();
            });

        });


    },

    //banner 初始化
    bannerListInit: function () {

        mySwiper = new Swiper('.banner_container', {
            initialSlide: 0,//设定初始化时slide的索引。
            direction: 'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
            speed: 300,//滑动速度，即slider自动滑动开始到结束的时间（单位ms）
            autoplay: 5000,//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
            autoplayDisableOnInteraction: false,//用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            grabCursor: true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
            setWrapperSize: true,//开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。

            //pagination : '.swiper-pagination',
            //prevSlideMessage: 'Previous slide',
            //nextSlideMessage: 'Next slide',
            //firstSlideMessage: 'This is the first slide',
            //lastSlideMessage: 'This is the last slide',
            //paginationBulletMessage:'Go to slide {{index}}',
            slidesOffsetBefore: 0,//设定slide与左边框的预设偏移量（单位px）。
            slidesOffsetAfter: 0,//设定slide与右边框的预设偏移量（单位px）。
            freeMode: false,//默认为false   false：一次滑一个 true：滑到哪里算哪里
            freeModeSticky: true,//使得freeMode也能自动贴合。 滑动模式下也可以贴合
            //slidesPerView: 3,//一页 显示的个数
            effect: 'slide',//slide的切换效果，默认为"slide"（位移切换），"fade"（淡入）"cube"（方块）"coverflow"（3d流）。
            loop: true,//是否循环
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            //// 如果需要滚动条
            //scrollbar: '.swiper-scrollbar',
        });

    },

    //我们的客户 img 初始化
    customerImgInit: function () {
        var mySwiper = new Swiper('.customer_img_list_container', {
            initialSlide: 1,//设定初始化时slide的索引。
            direction: 'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
            speed: 300,//滑动速度，即slider自动滑动开始到结束的时间（单位ms）
            autoplay: 5000,//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
            autoplayDisableOnInteraction: false,//用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            grabCursor: true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
            setWrapperSize: true,//开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。

            slidesOffsetBefore: 0,//设定slide与左边框的预设偏移量（单位px）。
            slidesOffsetAfter: 0,//设定slide与右边框的预设偏移量（单位px）。
            freeMode: false,//默认为false   false：一次滑一个 true：滑到哪里算哪里
            freeModeSticky: true,//使得freeMode也能自动贴合。 滑动模式下也可以贴合
            slidesPerView: 4,//一页 显示的个数
            effect: 'slide',//slide的切换效果，默认为"slide"（位移切换），"fade"（淡入）"cube"（方块）"coverflow"（3d流）。
            loop: false,//是否循环
            // 如果需要前进后退按钮
            //nextButton: '.swiper-button-next',
            //prevButton: '.swiper-button-prev',
            //// 如果需要滚动条
            //scrollbar: '.swiper-scrollbar',
        })
    },

    //我们的内容 初始化-数量
    countInit: function () {

        var count_1 = 1;
        var inter_1 = setInterval(function () {

            if (count_1 <= 31) {
                $(".block_2 .item_1 .count").html(count_1);

                count_1 += 1;
            }
            else {
                clearInterval(inter_1);
            }

        }, 50);

        var count_2 = 1;
        var inter_2 = setInterval(function () {
            if (count_2 <= 17) {
                $(".block_2 .item_2 .count").html(count_2);

                count_2 += 1;
            }
            else {
                clearInterval(inter_2);
            }
        }, 100);

        var count_3 = 100;
        var inter_3 = setInterval(function () {
            if (count_3 <= 3000) {
                $(".block_2 .item_3 .count").html(count_3);

                count_3 += 100;
            }
            else {
                clearInterval(inter_3);
            }
        }, 50);

        var count_4 = 5000;
        var inter_4 = setInterval(function () {
            if (count_4 <= 100000) {
                $(".block_2 .item_4 .count").html(count_4);

                count_4 += 5000;
            }
            else {
                clearInterval(inter_4);
            }
        }, 50);
    },

    //显示 音频文件
    showMedia: function () {
        $(".media_layer").css("display", "flex");
    },

    //隐藏 音频文件
    hideMedia: function () {
        $(".media_layer").css("display", "none");
    },

    //进入指定的页面
    goPage: function (type) {

        location.href = urlByType(type);//获取跳转链接

    }


};

$(function () {
    // $interface = getInterface();//获取 URL前缀

    index.init();
    // soin_calc.init();

});

