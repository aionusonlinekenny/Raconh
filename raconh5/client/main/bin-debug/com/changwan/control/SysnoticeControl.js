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
 * 17.12.16
     * 预告Control
     */
var SysnoticeControl = (function (_super) {
    __extends(SysnoticeControl, _super);
    function SysnoticeControl() {
        return _super.call(this) || this;
    }
    SysnoticeControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SYSNOTICE_QUERY, SysnoticeQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SYSNOTICE_REWARD, SysnoticeRewardCMD);
        Manager.socket.addCMD(Protocol.CMD_UPD_NOTICE, UpdNoticCMD);
    };
    /**
     * 查询
     */
    SysnoticeControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSNOTICE_QUERY);
        cmd.send();
    };
    SysnoticeControl.prototype.reward = function (taskid) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSNOTICE_REWARD);
        cmd.taskid = taskid;
        cmd.send();
    };
    /** 游戏公告 */
    SysnoticeControl.prototype.updNotice = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_UPD_NOTICE);
        cmd.send();
    };
    return SysnoticeControl;
}(BaseControl));
__reflect(SysnoticeControl.prototype, "SysnoticeControl");
//# sourceMappingURL=SysnoticeControl.js.map