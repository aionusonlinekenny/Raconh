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
 * 盟主战活动进行时信息
 */
var ClubLeaderWarStartInfoCMD = /** @class */ (function (_super) {
    __extends(ClubLeaderWarStartInfoCMD, _super);
    function ClubLeaderWarStartInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_START_INFO;
        return _this;
    }
    ClubLeaderWarStartInfoCMD.prototype.receive = function (pi) {
        var info = Manager.model.getClubLeaderWar().info;
        info.rank = pi.readShort();
        info.playNum = pi.readShort();
        info.playCountdown = pi.readInt();
        info.mobaiCount = 0;
        info.nextTime = 0;
        // info.rank = 1;
        // info.playNum = 50;
        // info.playCountdown = 0;
        // info.mobaiCount = 3;
        // info.nextTime = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) + 3600 * 24 * 7;
        info.rankList = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var rankInfo = new ClubLeaderWarRankInfo();
            rankInfo.rank = pi.readShort();
            rankInfo.id = pi.readInt64();
            rankInfo.nickName = pi.readUTF();
            rankInfo.career = pi.readByte();
            rankInfo.winCount = pi.readShort();
            info.rankList.push(rankInfo);
        }
        Manager.model.getClubLeaderWar().updateInfo(1);
        // Manager.model.getClubLeaderWar().updateInfo(0);
    };
    return ClubLeaderWarStartInfoCMD;
}(BaseCMD));
//# sourceMappingURL=ClubLeaderWarStartInfoCMD.js.map