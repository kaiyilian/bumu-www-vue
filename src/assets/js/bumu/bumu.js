/**
 * Created by Administrator on 2017/7/18.
 */


var RESPONSE_OK_CODE = "1000";

//json格式转换为字符串
var jsonParseParam = function (param, key) {
    var paramStr = "";

    if (param instanceof String || param instanceof Number || param instanceof Boolean) {
        paramStr += "&" + key + "=" + encodeURIComponent(param);
    }
    else {
        $.each(param, function (i) {
            var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
            paramStr += '&' + jsonParseParam(this, k);
        });
    }

    return paramStr.substr(1);


};

//post
var post = function (url, data, succFun, errFun) {
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(data),
        success: function (data) {
            succFun(data)
        },
        error: function (error) {
            errFun(error)
        }
    })
};

//get
var get = function (url, succFun, errFun) {
    $.ajax({
        url: url,
        type: "get",
        data: {},
        success: function (data) {
            succFun(data)
        },
        error: function (error) {
            errFun(error)
        }
    })
};

//jsonp格式
var jsonp_get = function (url, sucFun, errFun) {
    $.ajax({
        type: "GET",
        url: url,
        async: false,//同步
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: "data", //方法名称
        timeout: 5000,
        success: function (data) {
            //alert(JSON.stringify(data));
            sucFun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errFun(XMLHttpRequest)
        }
    });
};

//错误提示
var Error = function (obj) {

    if (typeof obj == "undefined") {
        toastr.error("请求异常,请联系管理员");
    }
    else if (typeof obj == "string") {
        toastr.error("提示：" + obj);
    }
    else {
        if (obj.status) {
            if (obj.status == 500)
                toastr.error("系统错误，请联系管理员！");
            else {
                toastr.error("请求异常");
            }
        }
        else {
            toastr.error(JSON.stringify(obj))
        }
    }

};


/**
 * 准备统计代码
 */

var cnzzId = "1259955107";
var cnzz_protocol = (('https:' === document.location.protocol) ? ' https://' : 'http://');
var cnzzStr = "%3Cspan %3E %3C/span%3E" +
    "%3Cscript src='" + cnzz_protocol +
    "s95.cnzz.com/z_stat.php%3Fid%3D" + cnzzId +
    "%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E";
// document.write(unescape(cnzzStr));


