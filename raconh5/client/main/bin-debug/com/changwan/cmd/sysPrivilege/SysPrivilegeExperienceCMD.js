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
 * 18.４.２４
 * 特权卡体验
 *  */
var SysPrivilegeExperienceCMD = (function (_super) {
    __extends(SysPrivilegeExperienceCMD, _super);
    function SysPrivilegeExperienceCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SYSPRIVILEGE_EXPERIENCE;
        return _this;
    }
    SysPrivilegeExperienceCMD.prototype.receive = function (ip) {
        var time = ip.readShort();
        Manager.model.getSysPrivilege().expTime(time);
    };
    return SysPrivilegeExperienceCMD;
}(BaseCMD));
__reflect(SysPrivilegeExperienceCMD.prototype, "SysPrivilegeExperienceCMD");
//# sourceMappingURL=SysPrivilegeExperienceCMD.js.map