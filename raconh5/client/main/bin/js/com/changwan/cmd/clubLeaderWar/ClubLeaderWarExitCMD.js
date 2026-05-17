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
 * 盟主战退出挑战
 */
var ClubLeaderWarExitCMD = /** @class */ (function (_super) {
    __extends(ClubLeaderWarExitCMD, _super);
    function ClubLeaderWarExitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_EXIT;
        return _this;
    }
    ClubLeaderWarExitCMD.prototype.receive = function (pi) {
        Manager.model.getArena().exitArenaHandler();
    };
    return ClubLeaderWarExitCMD;
}(BaseCMD));
//# sourceMappingURL=ClubLeaderWarExitCMD.js.map