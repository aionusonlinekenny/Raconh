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
 * 天天返利事件
 * pzx
 * create 2018-3-14
 */
var DailyRebateEvent = /** @class */ (function (_super) {
    __extends(DailyRebateEvent, _super);
    function DailyRebateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**更新 */
    DailyRebateEvent.DAILYREBATE_UPDATE = "DAILYREBATE_UPDATE";
    return DailyRebateEvent;
}(BaseEvent));
//# sourceMappingURL=DailyRebateEvent.js.map