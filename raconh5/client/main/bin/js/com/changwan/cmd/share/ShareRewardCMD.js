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
 * 18.3.16
 * 分享奖励
 *  */
var ShareRewardCMD = /** @class */ (function (_super) {
    __extends(ShareRewardCMD, _super);
    function ShareRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SHARE_REWARD;
        return _this;
    }
    ShareRewardCMD.prototype.receive = function (ip) {
        var status = ip.readByte();
        Manager.model.getshare().returnShareReward(status);
    };
    return ShareRewardCMD;
}(BaseCMD));
//# sourceMappingURL=ShareRewardCMD.js.map