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
 * 宗主数据更新
 */
var ClubMemberListCMD = /** @class */ (function (_super) {
    __extends(ClubMemberListCMD, _super);
    function ClubMemberListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_MEMBERLIST;
        return _this;
    }
    ClubMemberListCMD.prototype.processOut = function (pkg) {
    };
    ClubMemberListCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort() + 1;
        var allFight = 0;
        for (var i = 0; i < len; i++) {
            var clubMemberInfo = Manager.pool.create(ClubMemberInfo);
            clubMemberInfo.roleId = pi.readInt64();
            clubMemberInfo.nickName = pi.readUTF();
            clubMemberInfo.turnLife = pi.readByte();
            clubMemberInfo.level = pi.readShort();
            clubMemberInfo.sex = pi.readByte();
            clubMemberInfo.fighting = pi.readInt();
            clubMemberInfo.vip = pi.readByte();
            clubMemberInfo.type = pi.readByte();
            clubMemberInfo.clubCareer = pi.readShort();
            clubMemberInfo.hisDonate = pi.readInt64();
            clubMemberInfo.icon = pi.readByte();
            list.push(clubMemberInfo);
            if (i < len - 1)
                allFight += clubMemberInfo.fighting;
        }
        Manager.model.getClub().allFight = allFight;
        Manager.model.getClub().updateMemberListInfo(list);
    };
    return ClubMemberListCMD;
}(BaseCMD));
//# sourceMappingURL=ClubMemberListCMD.js.map