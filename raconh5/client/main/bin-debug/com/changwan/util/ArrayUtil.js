var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    /**
     * 多属性排序
     * @param arrProperty 属性列表
     * @param arrSort 排序方式(默认正序) 0正序 1倒序
     * @return 排序后的数组
     */
    ArrayUtil.sortOn = function (arr, arrProperty, arrSort) {
        if (arrSort === void 0) { arrSort = null; }
        if (arr == null || arr.length == 0)
            return arr;
        return arr.sort(function (obj1, obj2) {
            var len = arrProperty.length;
            var property = "";
            var sortLen = arrSort ? arrSort.length : 0;
            if (sortLen > len)
                sortLen = len;
            var sortType = 0;
            var result = 0;
            for (var i = 0; i < len; i++) {
                property = arrProperty[i];
                sortType = 0;
                if (i < sortLen)
                    sortType = arrSort[i];
                result = Number(obj1[property]) - Number(obj2[property]);
                if (result == 0)
                    continue;
                if (sortType == 0)
                    return result;
                return -result;
            }
            return 0;
        });
    };
    ArrayUtil.parseStringToArray = function (str, splitStr) {
        if (splitStr === void 0) { splitStr = ","; }
        var reg = /{|}| /g;
        str = str.replace(reg, "");
        var arr = str.split(splitStr);
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            result.push(parseInt(arr[i]));
        }
        return result;
    };
    return ArrayUtil;
}());
__reflect(ArrayUtil.prototype, "ArrayUtil");
//# sourceMappingURL=ArrayUtil.js.map