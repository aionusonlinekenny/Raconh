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
 */
var SysPrivilegeEvent = /** @class */ (function (_super) {
    __extends(SysPrivilegeEvent, _super);
    function SysPrivilegeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT = "SYSPRIVILEGE_UPDATE_EVENT";
    /**体验卡计时 */
    SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT = "SYSPRIVILEGE_EXP_TIME_EVENT";
    return SysPrivilegeEvent;
}(BaseEvent));
//# sourceMappingURL=SysPrivilegeEvent.js.map