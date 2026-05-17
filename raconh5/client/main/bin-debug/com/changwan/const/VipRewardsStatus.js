var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * vip奖励状态
 * liangyan
 * create 2017-12-25
*/
var VipRewardsStatus = (function () {
    function VipRewardsStatus() {
    }
    /**未领取 */
    VipRewardsStatus.UN_FETCH = 0;
    /**已领取 */
    VipRewardsStatus.HAS_FETCH = 1;
    /**未达标 */
    VipRewardsStatus.NOT_REACH = 2;
    return VipRewardsStatus;
}());
__reflect(VipRewardsStatus.prototype, "VipRewardsStatus");
//# sourceMappingURL=VipRewardsStatus.js.map