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
 * 18.1.15
     * 投资Control
     */
var SysInvestControl = (function (_super) {
    __extends(SysInvestControl, _super);
    function SysInvestControl() {
        return _super.call(this) || this;
    }
    SysInvestControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SYSINVEST_QUERY, SysInvestQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SYSINVEST_REWARD, SysInvestRewardCMD);
    };
    /**
     * 查询
     */
    SysInvestControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSINVEST_QUERY);
        cmd.send();
    };
    SysInvestControl.prototype.reward = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SYSINVEST_REWARD);
        cmd.id = id;
        cmd.send();
    };
    return SysInvestControl;
}(BaseControl));
__reflect(SysInvestControl.prototype, "SysInvestControl");
//# sourceMappingURL=SysInvestControl.js.map