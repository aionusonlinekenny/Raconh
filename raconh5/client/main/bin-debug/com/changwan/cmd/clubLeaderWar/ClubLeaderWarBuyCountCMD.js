var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 盟主战购买次数
 */
var ClubLeaderWarBuyCountCMD = (function (_super) {
    __extends(ClubLeaderWarBuyCountCMD, _super);
    function ClubLeaderWarBuyCountCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_BUY_COUNT;
        return _this;
    }
    ClubLeaderWarBuyCountCMD.prototype.receive = function (pi) {
        var info = Manager.model.getClubLeaderWar().info;
        info.playNum = pi.readByte();
        info.playCountdown = pi.readInt();
        Manager.model.getClubLeaderWar().dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_PLAY_TIME_UPDATE));
    };
    return ClubLeaderWarBuyCountCMD;
}(BaseCMD));
__reflect(ClubLeaderWarBuyCountCMD.prototype, "ClubLeaderWarBuyCountCMD");
//# sourceMappingURL=ClubLeaderWarBuyCountCMD.js.map