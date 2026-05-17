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
 * 盟主战活动结束信息
 */
var ClubLeaderWarEndInfoCMD = /** @class */ (function (_super) {
    __extends(ClubLeaderWarEndInfoCMD, _super);
    function ClubLeaderWarEndInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_END_INFO;
        return _this;
    }
    ClubLeaderWarEndInfoCMD.prototype.receive = function (pi) {
        var info = Manager.model.getClubLeaderWar().info;
        info.rank = 0;
        info.playNum = 0;
        info.playCountdown = 0;
        info.mobaiCount = pi.readShort();
        info.nextTime = pi.readInt();
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
        Manager.model.getClubLeaderWar().updateInfo(0);
    };
    return ClubLeaderWarEndInfoCMD;
}(BaseCMD));
//# sourceMappingURL=ClubLeaderWarEndInfoCMD.js.map