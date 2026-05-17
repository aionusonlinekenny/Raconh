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
 * 18.1.11
 * 领奖
 *  */
var SysPrivilegeRewardCMD = (function (_super) {
    __extends(SysPrivilegeRewardCMD, _super);
    function SysPrivilegeRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SYSPRIVILEGE_REWARD;
        return _this;
    }
    SysPrivilegeRewardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    SysPrivilegeRewardCMD.prototype.receive = function (ip) {
        var id = ip.readByte(); //特权id
        var reward = ip.readByte();
        Manager.model.getSysPrivilege().updateData(id, reward);
    };
    return SysPrivilegeRewardCMD;
}(BaseCMD));
__reflect(SysPrivilegeRewardCMD.prototype, "SysPrivilegeRewardCMD");
//# sourceMappingURL=SysPrivilegeRewardCMD.js.map