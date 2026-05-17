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
 * 18.1.11
     * Control
     */
var SysPrivilegeControl = /** @class */ (function (_super) {
    __extends(SysPrivilegeControl, _super);
    function SysPrivilegeControl() {
        return _super.call(this) || this;
    }
    SysPrivilegeControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SYSPRIVILEGE_QUERY, SysPrivilegeQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SYSPRIVILEGE_REWARD, SysPrivilegeRewardCMD);
        Manager.socket.addCMD(Protocol.CMD_SYSPRIVILEGE_EXPERIENCE, SysPrivilegeExperienceCMD);
    };
    /**
     * 查询
     */
    SysPrivilegeControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSPRIVILEGE_QUERY);
        cmd.send();
    };
    SysPrivilegeControl.prototype.reward = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSPRIVILEGE_REWARD);
        cmd.type = type;
        cmd.send();
    };
    /**体验卡请求 */
    SysPrivilegeControl.prototype.experience = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSPRIVILEGE_EXPERIENCE);
        cmd.send();
    };
    return SysPrivilegeControl;
}(BaseControl));
//# sourceMappingURL=SysPrivilegeControl.js.map