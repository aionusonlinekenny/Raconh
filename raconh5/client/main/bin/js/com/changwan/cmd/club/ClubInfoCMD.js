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
 * 宗门信息协议
 * Simon
 * create 2017-12-15
*/
var ClubInfoCMD = /** @class */ (function (_super) {
    __extends(ClubInfoCMD, _super);
    function ClubInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_INFO;
        return _this;
    }
    ClubInfoCMD.prototype.receive = function (pi) {
        var clubInfo = Manager.model.getClub().clubInfo;
        clubInfo.clubType = pi.readByte();
        clubInfo.clubName = pi.readUTF();
        clubInfo.desc = pi.readUTF();
        var len = pi.readShort();
        if (len > 0) {
            clubInfo.masterId = pi.readInt64();
            clubInfo.masterName = pi.readUTF();
            clubInfo.masterSex = pi.readByte();
            clubInfo.masterVip = pi.readByte();
            clubInfo.masterClubCareer = pi.readShort();
            clubInfo.masterFashion = pi.readInt();
            clubInfo.masterCloak = pi.readInt();
            clubInfo.masterWeapon = pi.readInt();
        }
        clubInfo.memberType = pi.readByte();
        clubInfo.clubCareer = pi.readShort();
        clubInfo.donate = pi.readInt();
        clubInfo.hisDonate = pi.readInt64();
        clubInfo.donateList = [];
        for (var j = 0; j < 2; j++) {
            var clubDonateInfo = Manager.pool.create(ClubDonateInfo);
            clubDonateInfo.donateType = j + 1;
            clubDonateInfo.count = 0;
            clubInfo.donateList.push(clubDonateInfo);
        }
        var donateLen = pi.readShort();
        for (var j = 0; j < donateLen; j++) {
            var type = pi.readByte();
            if (clubInfo.donateList[type - 1])
                clubInfo.donateList[type - 1].count = pi.readShort();
        }
        clubInfo.isGetReward = pi.readByte();
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
    };
    return ClubInfoCMD;
}(BaseCMD));
//# sourceMappingURL=ClubInfoCMD.js.map