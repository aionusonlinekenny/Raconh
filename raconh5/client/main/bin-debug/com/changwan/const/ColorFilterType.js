var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-27
 *description
*/
var ColorFilterType = (function () {
    function ColorFilterType() {
    }
    ColorFilterType.EMPTY = 0; //无
    ColorFilterType.BLUE = 1; //蓝
    ColorFilterType.GREEN = 2; //绿
    ColorFilterType.WHITE = 3; //白
    ColorFilterType.BLACK = 4; //黑
    ColorFilterType.RED = 5; //红
    return ColorFilterType;
}());
__reflect(ColorFilterType.prototype, "ColorFilterType");
//# sourceMappingURL=ColorFilterType.js.map