var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * create 18.1.29
 * 任务type
 */
var CashCowType = (function () {
    function CashCowType() {
    }
    CashCowType.TAP_CASHCOW = 1;
    CashCowType.TAP_LEVITEM = 2;
    CashCowType.TAP_SEVENDAY = 3;
    CashCowType.TAP_UPD_NOTICE = 4;
    CashCowType.TAP_QIANDAO = 5;
    return CashCowType;
}());
__reflect(CashCowType.prototype, "CashCowType");
//# sourceMappingURL=CashCowType.js.map