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
 * 盟主战任命
 */
var ClubLeaderWarDesignateCMD = (function (_super) {
    __extends(ClubLeaderWarDesignateCMD, _super);
    function ClubLeaderWarDesignateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CLUB_LEADER_WAR_DESIGNATE;
        return _this;
    }
    ClubLeaderWarDesignateCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.roleId);
    };
    ClubLeaderWarDesignateCMD.prototype.receive = function (pi) {
        var status = pi.readByte();
        if (status == 1) {
            FloatTips.addTips(LangCVO.getContent("clubLeaderWar27"), Color.GREEN);
            Manager.control.getClub().memberListQuery();
        }
        else
            FloatTips.addTips(LangCVO.getContent("clubLeaderWar28"), Color.RED);
    };
    return ClubLeaderWarDesignateCMD;
}(BaseCMD));
__reflect(ClubLeaderWarDesignateCMD.prototype, "ClubLeaderWarDesignateCMD");
//# sourceMappingURL=ClubLeaderWarDesignateCMD.js.map