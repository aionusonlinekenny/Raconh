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
 * 17.12.1
 * 披风升星
 *  */
var CloakUpgradeStarCMD = /** @class */ (function (_super) {
    __extends(CloakUpgradeStarCMD, _super);
    function CloakUpgradeStarCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLOAK_STAR;
        return _this;
    }
    CloakUpgradeStarCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    CloakUpgradeStarCMD.prototype.receive = function (ip) {
        var id = ip.readShort();
        var star = ip.readByte();
        Manager.model.getCloak().upGradeStarCloak(id, star);
    };
    return CloakUpgradeStarCMD;
}(BaseCMD));
//# sourceMappingURL=CloakUpgradeStarCMD.js.map