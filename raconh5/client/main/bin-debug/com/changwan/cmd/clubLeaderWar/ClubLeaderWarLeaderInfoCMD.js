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
 * 盟主战三大盟主信息
 */
var ClubLeaderWarLeaderInfoCMD = (function (_super) {
    __extends(ClubLeaderWarLeaderInfoCMD, _super);
    function ClubLeaderWarLeaderInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_LEADER_INFO;
        return _this;
    }
    ClubLeaderWarLeaderInfoCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new ClubLeaderWarLeaderInfo();
            info.rank = pi.readShort();
            info.roleId = pi.readInt64();
            info.career = pi.readByte();
            info.nickName = pi.readUTF();
            info.fight = pi.readInt();
            list.push(info);
        }
        list.sort(this.sortByFight);
        for (var i = 0; i < list.length; i++) {
            list[i].rank = i + 1;
        }
        Manager.model.getClubLeaderWar().updateLeaderInfo(list);
    };
    ClubLeaderWarLeaderInfoCMD.prototype.sortByFight = function (value1, value2) {
        if (value1.fight < value2.fight)
            return 1;
        else if (value1.fight > value2.fight)
            return -1;
        else
            return 0;
    };
    return ClubLeaderWarLeaderInfoCMD;
}(BaseCMD));
__reflect(ClubLeaderWarLeaderInfoCMD.prototype, "ClubLeaderWarLeaderInfoCMD");
//# sourceMappingURL=ClubLeaderWarLeaderInfoCMD.js.map