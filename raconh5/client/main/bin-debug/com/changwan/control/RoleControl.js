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
var RoleControl = (function (_super) {
    __extends(RoleControl, _super);
    function RoleControl() {
        return _super.call(this) || this;
    }
    RoleControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.ROLE_INFO_UPDATE_INT32, RoleInfoUpdateInt32CMD);
        Manager.socket.addCMD(Protocol.ROLE_INFO_UPDATE_STR, RoleInfoUpdateStrCMD);
        Manager.socket.addCMD(Protocol.ROLE_INFO_UPDATE_INT64, RoleInfoUpdateInt64CMD);
        Manager.socket.addCMD(Protocol.ROLE_BASE_INFO, RoleBaseInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_WORLD_LEVE, WorldLevelExpCMD);
    };
    RoleControl.prototype.worldLeve = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_WORLD_LEVE);
        cmd.send();
    };
    return RoleControl;
}(BaseControl));
__reflect(RoleControl.prototype, "RoleControl");
//# sourceMappingURL=RoleControl.js.map