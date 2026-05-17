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
     * 披风Control
     */
var CloakControl = /** @class */ (function (_super) {
    __extends(CloakControl, _super);
    function CloakControl() {
        return _super.call(this) || this;
    }
    CloakControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_CLOAK_QUEYT, CloakQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_CLOAK_ACTIVATE, CloakActivateCMD);
        Manager.socket.addCMD(Protocol.CMD_CLOAK_WARE, CloakWareCMD);
        Manager.socket.addCMD(Protocol.CMD_CLOAK_STAR, CloakUpgradeStarCMD);
    };
    /**
     * 查询
     */
    CloakControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLOAK_QUEYT);
        cmd.send();
    };
    CloakControl.prototype.activate = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLOAK_ACTIVATE);
        cmd.id = id;
        cmd.send();
    };
    CloakControl.prototype.rawe = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLOAK_WARE);
        cmd.id = id;
        cmd.send();
    };
    CloakControl.prototype.upgradeStar = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLOAK_STAR);
        cmd.id = id;
        cmd.send();
    };
    return CloakControl;
}(BaseControl));
//# sourceMappingURL=CloakControl.js.map