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
var ActivityEvent = /** @class */ (function (_super) {
    __extends(ActivityEvent, _super);
    function ActivityEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //日常领取更新
    ActivityEvent.DAILY_UPDATE = "DAILY_UPDATE";
    //日常阶段更新
    ActivityEvent.DAILY_SCHEDULE_UPDATE = "DAILY_SCHEDULE_UPDATE";
    return ActivityEvent;
}(BaseEvent));
//# sourceMappingURL=ActivityEvent.js.map