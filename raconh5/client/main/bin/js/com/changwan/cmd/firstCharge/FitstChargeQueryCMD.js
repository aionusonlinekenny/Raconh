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
 * 18.1.8
 * 充值豪礼
 *  */
var FitstChargeQueryCMD = /** @class */ (function (_super) {
    __extends(FitstChargeQueryCMD, _super);
    function FitstChargeQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_FIRSTCHARGE;
        return _this;
    }
    FitstChargeQueryCMD.prototype.receive = function (ip) {
        var n = ip.readByte();
        Manager.model.getSysCharge().returnIsReward(n == 1);
    };
    return FitstChargeQueryCMD;
}(BaseCMD));
//# sourceMappingURL=FitstChargeQueryCMD.js.map