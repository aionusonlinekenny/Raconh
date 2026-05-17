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
 * 投资领奖
 *  */
var SysInvestRewardCMD = /** @class */ (function (_super) {
    __extends(SysInvestRewardCMD, _super);
    function SysInvestRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SYSINVEST_REWARD;
        return _this;
    }
    SysInvestRewardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
    };
    SysInvestRewardCMD.prototype.receive = function (ip) {
        Manager.model.getSysInvest().sysList(ip);
    };
    return SysInvestRewardCMD;
}(BaseCMD));
//# sourceMappingURL=SysInvestRewardCMD.js.map