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
 * 宗门每日更新推送
 */
var ClubDailyUpdateCMD = /** @class */ (function (_super) {
    __extends(ClubDailyUpdateCMD, _super);
    function ClubDailyUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_DAILY_UPDATE;
        return _this;
    }
    ClubDailyUpdateCMD.prototype.receive = function (pi) {
        var clubInfo = Manager.model.getClub().clubInfo;
        if (clubInfo) {
            clubInfo.donate = pi.readInt();
            clubInfo.hisDonate = pi.readInt64();
            clubInfo.donateList = [];
            var donateLen = pi.readShort();
            for (var j = 0; j < donateLen; j++) {
                var type = pi.readByte();
                if (clubInfo.donateList[type - 1])
                    clubInfo.donateList[type - 1].count = pi.readShort();
            }
            clubInfo.isGetReward = pi.readByte();
            Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
            Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_DONATE));
        }
    };
    return ClubDailyUpdateCMD;
}(BaseCMD));
//# sourceMappingURL=ClubDailyUpdateCMD.js.map