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
 * 领奖
 *  */
var SysnoticeRewardCMD = (function (_super) {
    __extends(SysnoticeRewardCMD, _super);
    function SysnoticeRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SYSNOTICE_REWARD;
        return _this;
    }
    SysnoticeRewardCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.taskid);
    };
    SysnoticeRewardCMD.prototype.receive = function (ip) {
        var taskId = ip.readInt();
        var stet = ip.readByte();
        Manager.model.getSysnotice().updateSysList(taskId, stet);
    };
    return SysnoticeRewardCMD;
}(BaseCMD));
__reflect(SysnoticeRewardCMD.prototype, "SysnoticeRewardCMD");
//# sourceMappingURL=SysnoticeRewardCMD.js.map