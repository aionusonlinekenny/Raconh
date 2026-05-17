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
 * 天天返利
 * pzx
 * create 2018-3-14
 */
var DailyRebateControl = /** @class */ (function (_super) {
    __extends(DailyRebateControl, _super);
    function DailyRebateControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyRebateControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_DAILYREBATE_QUERY, DailyRebateQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_DAILYREBATE_REWARD, DailyRebateRewardCMD);
    };
    DailyRebateControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_DAILYREBATE_QUERY);
        cmd.send();
    };
    DailyRebateControl.prototype.reward = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_DAILYREBATE_REWARD);
        cmd.send();
    };
    return DailyRebateControl;
}(BaseControl));
//# sourceMappingURL=DailyRebateControl.js.map