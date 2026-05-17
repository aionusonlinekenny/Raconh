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
 * 18.1.18
 * 七天领奖
 *  */
var SevenDaysRewardCMD = /** @class */ (function (_super) {
    __extends(SevenDaysRewardCMD, _super);
    function SevenDaysRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SEVENDAYS_REWARD;
        return _this;
    }
    SevenDaysRewardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.login_id);
    };
    SevenDaysRewardCMD.prototype.receive = function (ip) {
        var day = ip.readByte();
        var n = ip.readByte();
        Manager.model.getcashCow().sevenDaysModel.reward(n, day);
    };
    return SevenDaysRewardCMD;
}(BaseCMD));
//# sourceMappingURL=SevenDaysRewardCMD.js.map