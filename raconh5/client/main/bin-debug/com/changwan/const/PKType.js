var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * PK模式
 * devil
 * create  2017-11-16
 * update
*/
var PKType = (function () {
    function PKType() {
    }
    /**
     * 和平
     */
    PKType.PEACE = 1;
    /**
     * 帮派
     */
    PKType.CLUB = 2;
    /**
     * 杀戮
     */
    PKType.ALL = 3;
    /**
     * 活动结盟（活动时的系统分配）
     */
    PKType.ACT = 4;
    return PKType;
}());
__reflect(PKType.prototype, "PKType");
//# sourceMappingURL=PKType.js.map