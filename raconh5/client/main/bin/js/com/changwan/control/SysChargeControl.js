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
 * 18.1.3
     * 充值control
     */
var SysChargeControl = /** @class */ (function (_super) {
    __extends(SysChargeControl, _super);
    function SysChargeControl() {
        return _super.call(this) || this;
    }
    SysChargeControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SYSCHARGE_QUERY, SysChargeQueryCMD);
    };
    /**
     * 查询
     */
    SysChargeControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSCHARGE_QUERY);
        cmd.send();
    };
    return SysChargeControl;
}(BaseControl));
//# sourceMappingURL=SysChargeControl.js.map