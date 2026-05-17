var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PointUtil = (function () {
    function PointUtil() {
    }
    PointUtil.getAngle = function (x1, y1, x2, y2) {
        return this.getRadian(x1, y1, x2, y2) / Math.PI * 180;
    };
    PointUtil.getRadian = function (x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    };
    PointUtil.getNextPoint = function (p, angle, disance) {
        return new egret.Point(p.x + Math.cos(angle) * disance, p.y + Math.sin(angle) * disance);
    };
    /** 判断p是否在p1和p2所组成的矩形中 */
    PointUtil.inRect = function (p1, p2, p) {
        var disX = Math.abs(p1.x - p2.x);
        var disY = Math.abs(p1.y - p2.y);
        var disX1 = Math.abs(p.x - p1.x);
        var disX2 = Math.abs(p.x - p2.x);
        var disY1 = Math.abs(p.y - p1.y);
        var disY2 = Math.abs(p.y - p2.y);
        return (disX == disX1 + disX2) && (disY == disY1 + disY2);
    };
    /** 判断p是否在p1和p2所组成的矩形中 */
    PointUtil.inRect2 = function (p1, p2, x, y) {
        var disX = Math.abs(p1.x - p2.x);
        var disY = Math.abs(p1.y - p2.y);
        var disX1 = Math.abs(x - p1.x);
        var disX2 = Math.abs(x - p2.x);
        var disY1 = Math.abs(y - p1.y);
        var disY2 = Math.abs(y - p2.y);
        return (disX == disX1 + disX2) && (disY == disY1 + disY2);
    };
    PointUtil.getPoint = function (src) {
        return new egret.Point(parseInt(src[0]), parseInt(src[1]));
    };
    PointUtil.getPoint2 = function (src, splitStr) {
        if (splitStr === void 0) { splitStr = ","; }
        var arr = src.split(splitStr);
        return new egret.Point(parseInt(arr[0]), parseInt(arr[1]));
    };
    PointUtil.getPoint3 = function (src, splitStr1, splitStr2) {
        if (splitStr1 === void 0) { splitStr1 = "|"; }
        if (splitStr2 === void 0) { splitStr2 = ","; }
        var result = [];
        var arr = src.split(splitStr1);
        for (var i = 0; i < arr.length; i++) {
            result.push(this.getPoint2(arr[i]));
        }
        return result;
    };
    return PointUtil;
}());
__reflect(PointUtil.prototype, "PointUtil");
//# sourceMappingURL=PointUtil.js.map