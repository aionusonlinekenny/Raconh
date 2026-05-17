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
 * 盟主战排名信息
 */
var ClubLeaderWarRankCMD = /** @class */ (function (_super) {
    __extends(ClubLeaderWarRankCMD, _super);
    function ClubLeaderWarRankCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_RANK;
        return _this;
    }
    ClubLeaderWarRankCMD.prototype.receive = function (pi) {
        var info = Manager.model.getClubLeaderWar().info;
        var len = pi.readShort();
        var has;
        for (var i = 0; i < len; i++) {
            var rankInfo = new ClubLeaderWarRankInfo();
            rankInfo.rank = pi.readShort();
            rankInfo.id = pi.readInt64();
            rankInfo.nickName = pi.readUTF();
            rankInfo.career = pi.readByte();
            rankInfo.winCount = 0;
            rankInfo.rankWinCount = pi.readShort();
            has = false;
            for (var j = 0; j < info.rankList.length; j++) {
                if (info.rankList[j].id == rankInfo.id) {
                    has = true;
                    info.rankList[j].rankWinCount = rankInfo.rankWinCount;
                    break;
                }
            }
            if (!has)
                info.rankList.push(rankInfo);
        }
        Manager.model.getClubLeaderWar().updateRank();
    };
    return ClubLeaderWarRankCMD;
}(BaseCMD));
//# sourceMappingURL=ClubLeaderWarRankCMD.js.map