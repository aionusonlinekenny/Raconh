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
 * pzx
 * 17.12.16
 * 充值活动领奖
 *  */
var RechargeActivityRewardCMD = /** @class */ (function (_super) {
    __extends(RechargeActivityRewardCMD, _super);
    function RechargeActivityRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_RECHARGEACTIVITY_REWARD;
        return _this;
    }
    RechargeActivityRewardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
    };
    RechargeActivityRewardCMD.prototype.receive = function (ip) {
        var id = ip.readByte();
        Manager.model.getrechargeActivity().returnReward(id);
    };
    return RechargeActivityRewardCMD;
}(BaseCMD));
//# sourceMappingURL=RechargeActivityRewardCMD.js.map