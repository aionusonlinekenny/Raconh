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
 * vip奖励更新
 * liangyan
 * create 2017-12-25
*/
var VipRewardsUpdateCMD = /** @class */ (function (_super) {
    __extends(VipRewardsUpdateCMD, _super);
    function VipRewardsUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.VIP_REWARDS_UPDATE;
        return _this;
    }
    VipRewardsUpdateCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.level);
    };
    VipRewardsUpdateCMD.prototype.receive = function (pi) {
        Manager.model.getVip().rewardsStaturs = pi.readShort();
    };
    return VipRewardsUpdateCMD;
}(BaseCMD));
//# sourceMappingURL=VipRewardsUpdateCMD.js.map