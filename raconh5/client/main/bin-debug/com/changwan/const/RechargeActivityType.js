var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 充值活动
 * 2018.1.19
 */
var RechargeActivityType = (function () {
    function RechargeActivityType() {
    }
    /** 单次充值 */
    RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE = 1;
    /** 今日累充 */
    RechargeActivityType.RECHARGEACTIVITY_TODAY_TYPE = 2;
    /** 累计充值 */
    RechargeActivityType.RECHARGEACTIVITY_TOTAL_TYPE = 3;
    /** 兑换活动 */
    RechargeActivityType.RECHARGEACTIVITY_EXCHANGE_TYPE = 4;
    /**冲级活动 */
    RechargeActivityType.RECHARGEACTIVITY_LEVE_TYPE = 5;
    /** 限时特惠活动 */
    RechargeActivityType.RECHARGEACTIVITY_XIANSHI_TYPE = 6;
    return RechargeActivityType;
}());
__reflect(RechargeActivityType.prototype, "RechargeActivityType");
//# sourceMappingURL=RechargeActivityType.js.map