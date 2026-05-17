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
 * vip额度更新协议
 * liangyan
 * create 2017-12-25
*/
var VipExpUpdateCMD = /** @class */ (function (_super) {
    __extends(VipExpUpdateCMD, _super);
    function VipExpUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.VIP_EXP_UPDATE;
        return _this;
    }
    VipExpUpdateCMD.prototype.receive = function (pi) {
        Manager.model.getVip().exp = pi.readShort();
    };
    return VipExpUpdateCMD;
}(BaseCMD));
//# sourceMappingURL=VipExpUpdateCMD.js.map