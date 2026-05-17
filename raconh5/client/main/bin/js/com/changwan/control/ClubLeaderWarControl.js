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
 * 盟主战控制器
 * Simon
 * 2018.2.3
 */
var ClubLeaderWarControl = /** @class */ (function (_super) {
    __extends(ClubLeaderWarControl, _super);
    function ClubLeaderWarControl() {
        return _super.call(this) || this;
    }
    ClubLeaderWarControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_START_INFO, ClubLeaderWarStartInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_END_INFO, ClubLeaderWarEndInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_RANK, ClubLeaderWarRankCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_MATCH, ClubLeaderWarMatchingCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_PLAY_INFO, ClubLeaderWarPlayInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_BUY_COUNT, ClubLeaderWarBuyCountCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_EXIT, ClubLeaderWarExitCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_DESIGNATE, ClubLeaderWarDesignateCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_LEADER_INFO, ClubLeaderWarLeaderInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_WORSHIP, ClubLeaderWarWorshipCMD);
    };
    ClubLeaderWarControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_START_INFO);
        cmd.send();
    };
    ClubLeaderWarControl.prototype.rankQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_RANK);
        cmd.send();
    };
    ClubLeaderWarControl.prototype.matchingQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_MATCH);
        cmd.send();
    };
    ClubLeaderWarControl.prototype.buyQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_BUY_COUNT);
        cmd.send();
    };
    ClubLeaderWarControl.prototype.exitQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_EXIT);
        cmd.send();
    };
    ClubLeaderWarControl.prototype.designateQuery = function (roleId) {
        var canDo = false;
        var list = Manager.model.getClub().clubMemberList;
        for (var i = 0; i < list.length; i++) {
            if (list[i].roleId == Manager.model.self.id) {
                if (list[i].type == 1) {
                    canDo = true;
                    break;
                }
            }
        }
        if (!canDo) {
            FloatTips.addTips(LangCVO.getContent("clubLeaderWar26"), Color.RED);
            return;
        }
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_DESIGNATE);
        cmd.roleId = roleId;
        cmd.send();
    };
    ClubLeaderWarControl.prototype.leaderRankQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_LEADER_INFO);
        cmd.send();
    };
    ClubLeaderWarControl.prototype.worshipQuery = function (roleId) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_WORSHIP);
        cmd.roleId = roleId;
        cmd.send();
    };
    return ClubLeaderWarControl;
}(BaseControl));
//# sourceMappingURL=ClubLeaderWarControl.js.map