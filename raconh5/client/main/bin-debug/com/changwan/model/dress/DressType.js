var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 装扮类型
 * liangyan
 * create 2017-11-28
*/
var DressType = (function () {
    function DressType() {
    }
    DressType.TITLE = 0; //称号
    DressType.CLOTHES = 1; //服装
    return DressType;
}());
__reflect(DressType.prototype, "DressType");
//# sourceMappingURL=DressType.js.map