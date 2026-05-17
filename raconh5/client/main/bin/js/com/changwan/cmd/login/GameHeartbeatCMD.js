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
var GameHeartbeatCMD = /** @class */ (function (_super) {
    __extends(GameHeartbeatCMD, _super);
    function GameHeartbeatCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.GAME_HEARTBEAT;
        return _this;
    }
    GameHeartbeatCMD.prototype.receive = function (pi) {
        var serverTime = pi.readInt();
        Manager.control.getLogin().heartbeatLostCount = 0;
        Manager.model.getLogin().serverTimeInfo.updateServerTime(serverTime);
    };
    return GameHeartbeatCMD;
}(BaseCMD));
//# sourceMappingURL=GameHeartbeatCMD.js.map