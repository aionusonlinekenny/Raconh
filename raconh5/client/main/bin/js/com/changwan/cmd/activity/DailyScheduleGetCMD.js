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
 * 日常阶段奖励领取与领取列表
 * luzhihong
 * create 2017-11-23
 */
var DailyScheduleGetCMD = /** @class */ (function (_super) {
    __extends(DailyScheduleGetCMD, _super);
    function DailyScheduleGetCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DAILY_SCHEDULE_GET;
        return _this;
    }
    DailyScheduleGetCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
    };
    DailyScheduleGetCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        if (count == 0) {
            Manager.model.getActivity().cleanDailySchedules();
        }
        else {
            while (count--) {
                Manager.model.getActivity().setDailySchedule(pi.readByte());
            }
        }
        Manager.model.getActivity().dispatchEvent(new ActivityEvent(ActivityEvent.DAILY_SCHEDULE_UPDATE));
    };
    return DailyScheduleGetCMD;
}(BaseCMD));
//# sourceMappingURL=DailyScheduleGetCMD.js.map