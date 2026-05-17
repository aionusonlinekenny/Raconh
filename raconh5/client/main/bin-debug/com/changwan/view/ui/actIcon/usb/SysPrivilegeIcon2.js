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
 * 投资活动图标
 * pzx
* @update devil 2018-04-16
*/
var SysPrivilegeIcon2 = (function (_super) {
    __extends(SysPrivilegeIcon2, _super);
    function SysPrivilegeIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    SysPrivilegeIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getSysInvest().addEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getSysPrivilege().addEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT, this.__drawRed, this);
    };
    SysPrivilegeIcon2.prototype.removeEvent = function () {
        Manager.model.getSysInvest().removeEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getSysPrivilege().removeEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    SysPrivilegeIcon2.prototype.hasRedIcon = function () {
        var boo = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_MONTH_TYPE)
            || Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_EXTREME_TYPE)
            || Manager.model.getSysPrivilege().checkReward();
        return boo;
    };
    return SysPrivilegeIcon2;
}(ActBaseIcon2));
__reflect(SysPrivilegeIcon2.prototype, "SysPrivilegeIcon2");
//# sourceMappingURL=SysPrivilegeIcon2.js.map