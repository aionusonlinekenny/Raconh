var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.setParam = function (content) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var len = param.length;
        var key = "";
        var result = content;
        for (var i = 0; i < len; i++) {
            key = "{" + i + "}";
            result = result.replace(key, param[i]);
        }
        return result;
    };
    StringUtils.setParamArr = function (content, arr) {
        var len = arr.length;
        var key = "";
        var result = content;
        for (var i = 0; i < len; i++) {
            key = "{" + i + "}";
            result = result.replace(key, arr[i]);
        }
        return result;
    };
    StringUtils.getBigNum = function (value, toFixed) {
        if (toFixed === void 0) { toFixed = 0; }
        var ret = "";
        if (value >= 100000000) {
            value = value / 100000000;
            if (toFixed == 0)
                ret = Math.floor(value) + LangCVO.getContent("common16");
            else
                ret = value.toFixed(toFixed) + LangCVO.getContent("common16");
        }
        else if (value >= 10000) {
            if (String(value).length > 5) {
                value = value / 10000;
                if (toFixed == 0)
                    ret = Math.floor(value) + LangCVO.getContent("common17");
                else
                    ret = value.toFixed(toFixed) + LangCVO.getContent("common17");
            }
            else
                ret = value + "";
        }
        else
            ret = value + "";
        return ret;
    };
    StringUtils.getStrlen = function (value) {
        var l = value.length;
        var blen = 0;
        for (var i = 0; i < l; i++) {
            if ((value.charCodeAt(i) & 0xff00) != 0)
                blen++;
            blen++;
        }
        return blen;
    };
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
//# sourceMappingURL=StringUtils.js.map