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
 * drq
 * 聚元Control
 * 2018.4.2
 */
var JuyuanControl = /** @class */ (function (_super) {
    __extends(JuyuanControl, _super);
    function JuyuanControl() {
        return _super.call(this) || this;
    }
    JuyuanControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_GATHER_INFO, JuyuanInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_PROGRESS, JuyuanProgressCMD);
    };
    //发
    JuyuanControl.prototype.senInitInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_GATHER_INFO);
        cmd.send();
    };
    JuyuanControl.prototype.sendProgress = function (type, args) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_PROGRESS);
        cmd._type = type;
        cmd._args = args;
        cmd.send();
    };
    return JuyuanControl;
}(BaseControl));
//# sourceMappingURL=JuyuanControl.js.map