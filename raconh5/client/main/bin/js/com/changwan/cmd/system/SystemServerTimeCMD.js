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
var SystemServerTimeCMD = /** @class */ (function (_super) {
    __extends(SystemServerTimeCMD, _super);
    function SystemServerTimeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SYSTEM_SERVER_TIME;
        return _this;
    }
    SystemServerTimeCMD.prototype.receive = function (pi) {
        var serverTime = pi.readInt();
        var open_time = pi.readInt();
        var merge_time = pi.readInt();
        Manager.model.getLogin().serverTimeInfo.updateServerTime(serverTime);
        Manager.model.getLogin().serverTimeInfo.updateSeverOpenTime(open_time);
    };
    return SystemServerTimeCMD;
}(BaseCMD));
//# sourceMappingURL=SystemServerTimeCMD.js.map