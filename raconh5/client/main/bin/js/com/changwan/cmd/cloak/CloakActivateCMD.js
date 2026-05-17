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
 * 17.11.28
 * 激活
 *  */
var CloakActivateCMD = /** @class */ (function (_super) {
    __extends(CloakActivateCMD, _super);
    function CloakActivateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLOAK_ACTIVATE;
        return _this;
    }
    CloakActivateCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    CloakActivateCMD.prototype.receive = function (ip) {
        var id = ip.readShort();
        var star = ip.readByte();
        Manager.model.getCloak().activateCloak(id, star);
    };
    return CloakActivateCMD;
}(BaseCMD));
//# sourceMappingURL=CloakActivateCMD.js.map