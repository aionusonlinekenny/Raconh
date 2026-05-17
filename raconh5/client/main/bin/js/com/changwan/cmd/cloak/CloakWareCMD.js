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
 * 穿戴
 *  */
var CloakWareCMD = /** @class */ (function (_super) {
    __extends(CloakWareCMD, _super);
    function CloakWareCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLOAK_WARE;
        return _this;
    }
    CloakWareCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    CloakWareCMD.prototype.receive = function (ip) {
        var id = ip.readShort();
        Manager.model.getCloak().setCurrentId(id);
    };
    return CloakWareCMD;
}(BaseCMD));
//# sourceMappingURL=CloakWareCMD.js.map