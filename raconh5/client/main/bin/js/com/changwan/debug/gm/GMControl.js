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
var GMControl = /** @class */ (function (_super) {
    __extends(GMControl, _super);
    function GMControl() {
        return _super.call(this) || this;
    }
    GMControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_ADMIN_ALL, GMCmdListCMD);
        Manager.socket.addCMD(Protocol.CMD_ADMIN_REQUEST, GMCmdRequestCMD);
    };
    //命令列表
    GMControl.prototype.gmList = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ADMIN_ALL);
        cmd.str = "";
        cmd.send();
    };
    //执行命令请求
    GMControl.prototype.gmListRequest = function (content) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ADMIN_REQUEST);
        cmd.str = content;
        cmd.send();
    };
    return GMControl;
}(BaseControl));
//# sourceMappingURL=GMControl.js.map