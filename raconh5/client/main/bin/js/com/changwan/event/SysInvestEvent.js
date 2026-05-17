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
var SysInvestEvent = /** @class */ (function (_super) {
    __extends(SysInvestEvent, _super);
    function SysInvestEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    SysInvestEvent.SYSINVEST_UPDATE_EVENT = "SYSINVEST_UPDATE_EVENT";
    return SysInvestEvent;
}(BaseEvent));
//# sourceMappingURL=SysInvestEvent.js.map