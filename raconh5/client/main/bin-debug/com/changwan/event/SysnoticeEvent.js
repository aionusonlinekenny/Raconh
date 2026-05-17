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
 * 17.12.18
 */
var SysnoticeEvent = (function (_super) {
    __extends(SysnoticeEvent, _super);
    function SysnoticeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    SysnoticeEvent.SYSNOTICE_UPDATE_REWARD_EVENT = "SYSNOTICE_UPDATE_REWARD_EVENT";
    SysnoticeEvent.SYSNOTICE_QUERY_EVENT = "SYSNOTICE_QUERY_EVENT";
    SysnoticeEvent.UPD_NOTICE_EVENT = "UPD_NOTICE_EVENT";
    return SysnoticeEvent;
}(BaseEvent));
__reflect(SysnoticeEvent.prototype, "SysnoticeEvent");
//# sourceMappingURL=SysnoticeEvent.js.map