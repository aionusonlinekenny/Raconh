var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 17.12.14
     * 改名
     */
var RenameControl = (function (_super) {
    __extends(RenameControl, _super);
    function RenameControl() {
        return _super.call(this) || this;
    }
    RenameControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_ROLE_RENAME, RenameCMD);
    };
    RenameControl.prototype.rename = function (name) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_ROLE_RENAME);
        cmd.rename = name;
        cmd.send();
    };
    return RenameControl;
}(BaseControl));
__reflect(RenameControl.prototype, "RenameControl");
//# sourceMappingURL=RenameControl.js.map