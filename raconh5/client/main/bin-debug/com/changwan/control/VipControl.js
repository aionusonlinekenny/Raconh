var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * vip控制器
 * liangyan
 * create 2017-12-20
*/
var VipControl = (function (_super) {
    __extends(VipControl, _super);
    function VipControl() {
        return _super.call(this) || this;
    }
    VipControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.VIP_EXP_UPDATE, VipExpUpdateCMD);
        Manager.socket.addCMD(Protocol.VIP_REWARDS_UPDATE, VipRewardsUpdateCMD);
    };
    /**领取vip等级奖励 */
    VipControl.prototype.getRewardsByLevel = function (level) {
        var cmd = Manager.socket.getCMD(Protocol.VIP_REWARDS_UPDATE);
        cmd.level = level;
        cmd.send();
    };
    return VipControl;
}(BaseControl));
__reflect(VipControl.prototype, "VipControl");
//# sourceMappingURL=VipControl.js.map