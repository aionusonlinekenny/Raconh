var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SysprivilegeType = (function () {
    function SysprivilegeType() {
    }
    /** 黄金卡 */
    SysprivilegeType.GOLD_CARD = 1;
    /** 钻石卡 */
    SysprivilegeType.DIAMOND_CARD = 2;
    return SysprivilegeType;
}());
__reflect(SysprivilegeType.prototype, "SysprivilegeType");
//# sourceMappingURL=SysprivilegeType.js.map