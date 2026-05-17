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
 * 2018.1.3
 */
var SysChargeEvent = (function (_super) {
    __extends(SysChargeEvent, _super);
    function SysChargeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SysChargeEvent.SYSCHARGE_QUERY_EVENT = "SYSCHARGE_QUERY_EVENT";
    return SysChargeEvent;
}(BaseEvent));
__reflect(SysChargeEvent.prototype, "SysChargeEvent");
//# sourceMappingURL=SysChargeEvent.js.map