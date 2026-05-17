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
 * 金蟾领奖
 *  */
var CashCowRewardCMD = /** @class */ (function (_super) {
    __extends(CashCowRewardCMD, _super);
    function CashCowRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CASHCOW_REWARD;
        return _this;
    }
    CashCowRewardCMD.prototype.receive = function (ip) {
        var time = ip.readInt();
        ///let coin:number = ip.readInt();
        var draw = ip.readByte();
        var current = ip.readByte();
        var rewardnum = ip.readByte();
        Manager.model.getcashCow().rewardUpdateInfo(time, draw, current, rewardnum);
    };
    return CashCowRewardCMD;
}(BaseCMD));
//# sourceMappingURL=CashCowRewardCMD.js.map