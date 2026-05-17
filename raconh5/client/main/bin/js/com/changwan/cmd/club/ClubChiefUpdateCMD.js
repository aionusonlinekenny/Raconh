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
var ClubChiefUpdateCMD = /** @class */ (function (_super) {
    __extends(ClubChiefUpdateCMD, _super);
    function ClubChiefUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_CHIEF_UPDATE;
        return _this;
    }
    ClubChiefUpdateCMD.prototype.receive = function (pi) {
        var clubInfo = Manager.model.getClub().clubInfo;
        if (clubInfo) {
            clubInfo.masterId = pi.readInt64();
            clubInfo.masterName = pi.readUTF();
            clubInfo.masterSex = pi.readByte();
            clubInfo.masterVip = pi.readByte();
            clubInfo.masterClubCareer = pi.readShort();
            clubInfo.masterFashion = pi.readInt();
            clubInfo.masterCloak = pi.readInt();
            clubInfo.masterWeapon = pi.readInt();
        }
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
    };
    return ClubChiefUpdateCMD;
}(BaseCMD));
//# sourceMappingURL=ClubChiefUpdateCMD.js.map