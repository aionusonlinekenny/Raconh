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
 * 17.11.18
 * 经脉升级
 *  */
var JingMaiLvUpCMD = /** @class */ (function (_super) {
    __extends(JingMaiLvUpCMD, _super);
    function JingMaiLvUpCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_JINGMAI_LV_UP;
        return _this;
    }
    JingMaiLvUpCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.playid);
        pkg.writeShort(this.leve);
    };
    JingMaiLvUpCMD.prototype.receive = function (ip) {
        var payId = ip.readInt64();
        var id = ip.readShort();
        Manager.model.getJingMai().lvUpJianmai(payId, id);
    };
    return JingMaiLvUpCMD;
}(BaseCMD));
//# sourceMappingURL=JingMaiLvUpCMD.js.map