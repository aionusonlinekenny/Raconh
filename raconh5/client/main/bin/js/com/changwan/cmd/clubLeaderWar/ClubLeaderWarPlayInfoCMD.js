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
 * 盟主战对手信息
 */
var ClubLeaderWarPlayInfoCMD = /** @class */ (function (_super) {
    __extends(ClubLeaderWarPlayInfoCMD, _super);
    function ClubLeaderWarPlayInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_PLAY_INFO;
        return _this;
    }
    ClubLeaderWarPlayInfoCMD.prototype.receive = function (pi) {
        Manager.model.getArena().playType = 2;
        Manager.model.getArena().updatePKData(pi, true);
    };
    return ClubLeaderWarPlayInfoCMD;
}(BaseCMD));
//# sourceMappingURL=ClubLeaderWarPlayInfoCMD.js.map