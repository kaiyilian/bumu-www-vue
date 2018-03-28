/**
 * Created by Administrator on 2017/7/17.
 */


var $interface;
var $calc_container_modal;//社保计算器 modal

//社保计算器
var soin_calc = {

    city_list_url: null,//城市列表
    soin_type_list_url: null,//社保类型 列表
    soin_calc_url: null,//社保计算

    init: function () {

        soin_calc.initUrlList();//初始化 接口

        //右侧 操作功能
        var timer;
        $(".operate_container .opt_item:not(:last-child)").each(function () {
            $(this).hover(
                function () {
                    $(this).addClass("active").siblings().removeClass("active");

                    $(this).find(".txt").show();
                    $(this).siblings().find(".txt").hide();
                    clearTimeout(timer);
                },
                function () {
                    timer = setTimeout(function () {
                        $(".operate_container .opt_item.active").find(".txt").hide();
                        $(".operate_container .opt_item.active").removeClass("active")
                    }, 3000)
                }
            );
        });

        //计算器 弹框
        $calc_container_modal.on('shown.bs.modal', function (e) {
            soin_calc.calcReset();//重置计算器

            soin_calc.initCityList();//获取城市列表

        });

    },
    //初始化 接口
    initUrlList: function () {

        soin_calc.city_list_url = $interface + "soin/city/list?type=browser";
        soin_calc.soin_type_list_url = $interface + "soin/base_info/any";
        soin_calc.soin_calc_url = $interface + "soin/calculate";

    },
    //获取城市列表
    initCityList: function () {

        jsonp_get(
            soin_calc.city_list_url,
            function (data) {
                //alert(JSON.stringify(data))

                if (data.code === RESPONSE_OK_CODE) {

                    var $area_list = $calc_container_modal.find(".left_side").find(".soin_area_container select");
                    $area_list.empty();

                    if (data.result && data.result.length > 0) {

                        for (var i = 0; i < data.result.length; i++) {

                            var item = data.result[i];

                            var city_id = item.city_id;//
                            var city_name = item.city_name;//

                            var $option = $("<option>");
                            $option.attr("value", city_id);
                            $option.text(city_name);
                            $option.appendTo($area_list);

                        }

                        soin_calc.initSoinTypeList();//获取参保类型列表

                    }
                    else {

                        var $option = $("<option>");
                        $option.attr("value", "");
                        $option.text("参保地");
                        $option.appendTo($area_list);

                    }

                }
                else {
                    Error("获取城市列表失败")
                }

            },
            function (error) {
                //alert(JSON.stringify(error))
                Error(error)
            }
        );

    },
    //获取参保类型列表
    initSoinTypeList: function () {
        var id = $calc_container_modal.find(".left_side").find(".soin_area_container select option:selected").val();

        var obj = {
            type: "browser",
            district_id: id
        };
        var url = soin_calc.soin_type_list_url + "?" + jsonParseParam(obj);

        jsonp_get(
            url,
            function (data) {
                //alert(JSON.stringify(data))
                // console.log(JSON.stringify(data));

                if (data.code === RESPONSE_OK_CODE) {

                    var type_list = "";
                    for (var i = 0; i < data.result.length; i++) {
                        var item = data.result[i];

                        var type_id = item.type_id;//
                        var type_name = item.type_name;//
                        var house_fund_must = item.house_fund_must;//公积金基数是否必填 1 必填 0 非必填

                        type_list += "<option value='" + type_id + "' data-ismust='" + house_fund_must +
                            "'>" + type_name + "</option>";


                        var soin_min = item.min_min_base;//社保 最低基数
                        var soin_max = item.min_max_base;//社保 最高基数
                        var fund_min = item.house_fund.min_base;//公积金 最低基数
                        var fund_max = item.house_fund.max_base;//公积金 最高基数

                        sessionStorage.setItem("soin_min_" + type_id, soin_min);
                        sessionStorage.setItem("soin_max_" + type_id, soin_max);
                        sessionStorage.setItem("fund_min_" + type_id, fund_min);
                        sessionStorage.setItem("fund_max_" + type_id, fund_max);
                        sessionStorage.setItem("is_must_" + type_id, house_fund_must);

                    }
                    $calc_container_modal.find(".left_side")
                        .find(".soin_type_container select").html(type_list);

                    soin_calc.SoinTypeInit();//参保类型初始化

                }
                else {
                    Error("获取参保类型列表失败")
                }

            },
            function (error) {
                //alert("error:" + JSON.stringify(error))
                Error(error);
            }
        );

    },
    //参保类型初始化
    SoinTypeInit: function () {
        soin_calc.calcReset();

        var type_id = $calc_container_modal.find(".left_side")
            .find(".soin_type_container select option:selected").val();

        var is_must = sessionStorage.getItem("is_must_" + type_id);
        var soin_min = sessionStorage.getItem("soin_min_" + type_id);
        var soin_max = sessionStorage.getItem("soin_max_" + type_id);
        var fund_min = sessionStorage.getItem("fund_min_" + type_id);
        var fund_max = sessionStorage.getItem("fund_max_" + type_id);


        var soin_txt = "社保基数(" + soin_min + "~~" + soin_max + ")";
        var fund_txt = "公积金基数(" + fund_min + "~~" + fund_max + ")";
        $calc_container_modal.find(".left_side")
            .find(".soin_basic_container input").attr({
            "data-min": soin_min,
            "data-max": soin_max,
            "placeholder": soin_txt
        });

        $calc_container_modal.find(".left_side")
            .find(".fund_container input").attr({
            "data-min": fund_min,
            "data-max": fund_max,
            "placeholder": fund_txt
        });

        if (is_must == 0) {
            $calc_container_modal.find(".left_side")
                .find(".fund_container").removeClass("must");
        }
        else {
            $calc_container_modal.find(".left_side")
                .find(".fund_container").addClass("must");
        }
    },
    //重置计算器
    calcReset: function () {

        var txt = "<div class='prompt'>输入左侧数据才能生成明细哦~~</div>";
        $calc_container_modal.find(".content_info").html(txt);

        var $left_side = $calc_container_modal.find(".left_side");
        $left_side.find(".soin_basic_container input").val("");//社保基数
        $left_side.find(".fund_container input").val("");//公积金基数

    },

    //计算器 弹框显示
    calcModalShow: function () {

        $calc_container_modal.modal("show");

    },

    //计算社保信息
    SoinCalc: function () {
        if (!soin_calc.CheckCalcParam()) {
            return
        }

        var obj = {
            type: "browser",
            type_id: soin_calc_param.type_id,
            soin_base: soin_calc_param.soin_base,
            house_fund_base: soin_calc_param.house_fund_base
        };
        var url = soin_calc.soin_calc_url + "?" + jsonParseParam(obj);

        jsonp_get(
            url,
            function (data) {
                //alert(JSON.stringify(data))
                console.log(data);

                if (data.code === RESPONSE_OK_CODE) {
                    toastr.success("计算成功！");

                    var total_pay = data.result.total_payment;//总共缴费
                    var person_total_payment = data.result.person_payment;//个人总共缴费
                    var corp_total_payment = data.result.corp_payment;//公司缴费
                    var soin_payment = data.result.soin_payment;//社保缴费
                    var house_fund_payment = data.result.house_fund_payment;//公积金缴费


                    var content_info = "";
                    for (var i = 0; i < data.result.soin_rule_calculate_results.length; i++) {
                        var item = data.result.soin_rule_calculate_results[i];

                        var name = item.name;//
                        var base = item.base;//基数
                        var person_percentage = item.person_percentage;//个人比例
                        var person_payment = item.person_payment;//个人缴费
                        var corp_percentage = item.corp_percentage;//公司比例
                        var corp_payment = item.corp_payment;//公司缴费

                        content_info +=
                            "<div class='item col-xs-12'>" +
                            "<div class='col-xs-2 type_name'>" + name + "</div>" +
                            "<div class='col-xs-2 basic_count'>" + base + "</div>" +
                            "<div class='col-xs-2 per_pay_percentage'>" + person_percentage + "</div>" +
                            "<div class='col-xs-2 per_pay_amount'>" + person_payment + "</div>" +
                            "<div class='col-xs-2 corp_pay_percentage'>" + corp_percentage + "</div>" +
                            "<div class='col-xs-2 corp_pay_amount'>" + corp_payment + "</div>" +
                            "</div>";
                    }

                    for (var j = 0; j < data.result.house_fund_calculate_results.length; j++) {
                        var item = data.result.house_fund_calculate_results[j];

                        var name = item.name;//
                        var base = item.base;//基数
                        var person_percentage = item.person_percentage;//个人比例
                        var person_payment = item.person_payment;//个人缴费
                        var corp_percentage = item.corp_percentage;//公司比例
                        var corp_payment = item.corp_payment;//公司缴费

                        content_info +=
                            "<div class='item col-xs-12'>" +
                            "<div class='col-xs-2 type_name'>" + name + "</div>" +
                            "<div class='col-xs-2 basic_count'>" + base + "</div>" +
                            "<div class='col-xs-2 per_pay_percentage'>" + person_percentage + "</div>" +
                            "<div class='col-xs-2 per_pay_amount'>" + person_payment + "</div>" +
                            "<div class='col-xs-2 corp_pay_percentage'>" + corp_percentage + "</div>" +
                            "<div class='col-xs-2 corp_pay_amount'>" + corp_payment + "</div>" +
                            "</div>";
                    }

                    content_info +=
                        "<div class='item col-xs-12'>" +
                        "<div class='col-xs-2 '></div>" +
                        "<div class='col-xs-2 '></div>" +
                        "<div class='col-xs-4'>" +
                        "<span>个人共缴：</span>" +
                        "<span class='count'>" + person_total_payment + "</span>" +
                        "</div>" +
                        "<div class='col-xs-4'>" +
                        "<span>企业共缴：</span>" +
                        "<span class='count'>" + corp_total_payment + "</span>" +
                        "</div>" +
                        "</div>" +
                        "<div class='line col-xs-12'>" +
                        "<span class='col-xs-5'>" +
                        "<span>总共缴：</span>" +
                        "<span class='count total_count'>" + total_pay + "</span>" +
                        "</span>" +
                        "<span>" +
                        "<span>（其中社保：</span>" +
                        "<span class='count soin_count'>" + soin_payment + "</span>" +
                        "<span>公积金：</span>" +
                        "<span class='count fund_count'>" + house_fund_payment + "</span>" +
                        "<span>）</span>" +
                        "</span>" +
                        "</div>";
                    $calc_container_modal.find(".content_info").html(content_info);
                }
                else {
                    toastr.warning("计算失败");
                }

            },
            function (error) {
                // alert(JSON.stringify(error));
                Error(error);
            }
        )

    },
    //检查 计算社保的参数
    CheckCalcParam: function () {

        soin_calc_param.initParam();//初始化 参数

        var flag = false;
        var txt = "";

        var $left_side = $calc_container_modal.find(".left_side");

        soin_calc_param.type_id = $left_side.find(".soin_type_container select option:selected").val();
        soin_calc_param.soin_base = parseFloat($left_side.find(".soin_basic_container input").val());
        soin_calc_param.house_fund_base = $.trim($left_side.find(".fund_container input").val());
        soin_calc_param.house_fund_base = isNaN(parseFloat(soin_calc_param.house_fund_base))
            ? "" : parseFloat(soin_calc_param.house_fund_base);

        soin_calc_param.is_must = parseInt(sessionStorage.getItem("is_must_" + soin_calc_param.type_id));//0 非必填 1 必填
        soin_calc_param.soin_min = parseFloat(sessionStorage.getItem("soin_min_" + soin_calc_param.type_id));
        soin_calc_param.soin_max = parseFloat(sessionStorage.getItem("soin_max_" + soin_calc_param.type_id));
        soin_calc_param.fund_min = parseFloat(sessionStorage.getItem("fund_min_" + soin_calc_param.type_id));
        soin_calc_param.fund_max = parseFloat(sessionStorage.getItem("fund_max_" + soin_calc_param.type_id));


        if (!soin_calc_param.soin_base) {
            txt = "社保基数不能为空！";
        }
        else if (isNaN(parseFloat(soin_calc_param.soin_base))) {
            txt = "社保基数必须为数字！";
        }
        else if (soin_calc_param.is_must && !soin_calc_param.house_fund_base) {
            txt = "公积金基数不能为空！";
        }
        else if (soin_calc_param.is_must && isNaN(parseFloat(soin_calc_param.house_fund_base))) {
            txt = "公积金基数必须为数字！";
        }
        else if (soin_calc_param.soin_base < soin_calc_param.soin_min) {
            txt = "社保基数最低为" + soin_calc_param.soin_min;
        }
        else if (soin_calc_param.soin_base > soin_calc_param.soin_max) {
            txt = "社保基数最高为" + soin_calc_param.soin_max;
        }
        else if (soin_calc_param.is_must && soin_calc_param.house_fund_base < soin_calc_param.fund_min) {
            txt = "公积金基数最低为" + soin_calc_param.fund_min;
        }
        else if (soin_calc_param.is_must && soin_calc_param.house_fund_base > soin_calc_param.fund_max) {
            txt = "公积金基数最高为" + soin_calc_param.fund_max;
        }
        else {
            flag = true;
        }

        if (txt) {
            toastr.warning(txt);
        }

        return flag;

    },

    //检查 是否是数字
    checkIsNumber: function (self) {

        var $self = $(self);

        //如果不是 数字型
        if (isNaN(parseFloat($self.val()))) {
            $self.val("");
        }

    },

    //返回顶部
    goTop: function () {
        $(window).scrollTop(0);
    },

};

var soin_calc_param = {

    is_must: null,//是否 必填
    soin_min: null,//社保 最低基数
    soin_max: null,//社保 最高基数
    fund_min: null,//公积金 最低基数
    fund_max: null,//公积金 最高基数

    type_id: null,//社保类型 id
    soin_base: null,//社保基数
    house_fund_base: null,//公积金基数

    initParam: function () {

        soin_calc_param.type_id = null;
        soin_calc_param.soin_base = null;
        soin_calc_param.house_fund_base = null;

        soin_calc_param.is_must = null;
        soin_calc_param.soin_min = null;
        soin_calc_param.soin_max = null;
        soin_calc_param.fund_min = null;
        soin_calc_param.fund_max = null;

    }


};

$(function () {
    $calc_container_modal = $(".calc_container_modal");

    $interface = getInterface();//获取 URL前缀

    soin_calc.init();

});
