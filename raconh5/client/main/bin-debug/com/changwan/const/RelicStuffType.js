var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *神器类型
 * pzx
 * create 2017-12-22
*/
var RelicStuffType = (function () {
    function RelicStuffType() {
    }
    /**神器 */
    RelicStuffType.RELICSTUFF_TYPE = 2;
    /** 碎片 */
    RelicStuffType.DEBRIS_TYPE = 1;
    return RelicStuffType;
}());
__reflect(RelicStuffType.prototype, "RelicStuffType");
//# sourceMappingURL=RelicStuffType.js.map