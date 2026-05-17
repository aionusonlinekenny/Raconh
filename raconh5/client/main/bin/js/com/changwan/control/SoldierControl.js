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
 * 兵魂
 * Simon
 * 2017.12.21
 */
var SoldierControl = /** @class */ (function (_super) {
    __extends(SoldierControl, _super);
    function SoldierControl() {
        return _super.call(this) || this;
    }
    SoldierControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.SHENBING_INFO, SoldierInfoCMD);
        Manager.socket.addCMD(Protocol.SHENBING_ACTIVATE, SoldierActivateCMD);
        Manager.socket.addCMD(Protocol.SHENBING_PUTON, SoldierPutonCMD);
        Manager.socket.addCMD(Protocol.SHENBING_UPGRADE_START, SoldierUpgradeStarCMD);
    };
    SoldierControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.SHENBING_INFO);
        cmd.send();
    };
    SoldierControl.prototype.activate = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.SHENBING_ACTIVATE);
        cmd.id = id;
        cmd.send();
    };
    SoldierControl.prototype.puton = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.SHENBING_PUTON);
        cmd.id = id;
        cmd.send();
    };
    SoldierControl.prototype.upgradeStar = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.SHENBING_UPGRADE_START);
        cmd.id = id;
        cmd.send();
    };
    return SoldierControl;
}(BaseControl));
//# sourceMappingURL=SoldierControl.js.map