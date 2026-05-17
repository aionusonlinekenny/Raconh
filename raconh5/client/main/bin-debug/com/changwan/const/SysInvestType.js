var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SysInvestType = (function () {
    function SysInvestType() {
    }
    /** 半月卡 */
    SysInvestType.SYSINVEST_MONTH_TYPE = "28";
    /** 至尊卡 */
    SysInvestType.SYSINVEST_EXTREME_TYPE = "88";
    return SysInvestType;
}());
__reflect(SysInvestType.prototype, "SysInvestType");
//# sourceMappingURL=SysInvestType.js.map