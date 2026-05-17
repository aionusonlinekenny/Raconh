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
 * 活跃控制器
 * luzhihong
 * create 2017-11-22
 */
var ActivityControl = /** @class */ (function (_super) {
    __extends(ActivityControl, _super);
    function ActivityControl() {
        return _super.call(this) || this;
    }
    ActivityControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.DAILY_GET, DailyGetCMD);
        Manager.socket.addCMD(Protocol.DAILY_SCHEDULE_GET, DailyScheduleGetCMD);
    };
    /*领取日常奖励*/
    ActivityControl.prototype.getDailyRewards = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.DAILY_GET);
        cmd.id = id;
        cmd.send();
    };
    /*领取日常阶段奖励*/
    ActivityControl.prototype.getDailySchedule = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.DAILY_SCHEDULE_GET);
        cmd.id = id;
        cmd.send();
    };
    return ActivityControl;
}(BaseControl));
//# sourceMappingURL=ActivityControl.js.map