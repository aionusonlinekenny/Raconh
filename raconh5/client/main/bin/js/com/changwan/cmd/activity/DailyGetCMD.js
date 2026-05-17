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
 * 日常奖励领取与领取列表信息
 * luzhihong
 * create 2017-11-23
 */
var DailyGetCMD = /** @class */ (function (_super) {
    __extends(DailyGetCMD, _super);
    function DailyGetCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DAILY_GET;
        return _this;
    }
    DailyGetCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
    };
    DailyGetCMD.prototype.receive = function (pi) {
        Manager.model.getActivity().curDailyValue = pi.readInt();
        var count = pi.readShort();
        if (count == 0) {
            Manager.model.getActivity().cleanDailyStates();
        }
        else {
            while (count--) {
                var id = pi.readByte();
                var count_1 = pi.readInt();
                var hasGet = pi.readByte() != 0;
                Manager.model.getActivity().setDailyState(id, count_1, hasGet);
            }
        }
        Manager.model.getActivity().dispatchEvent(new ActivityEvent(ActivityEvent.DAILY_UPDATE));
    };
    return DailyGetCMD;
}(BaseCMD));
//# sourceMappingURL=DailyGetCMD.js.map