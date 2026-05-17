/**
 * 盟会战列表玩家信息
 * luzhihong
 * create 2018.2.1
 */
var ClubBFPlayerInfo = /** @class */ (function () {
    function ClubBFPlayerInfo(isDef) {
        this.isDef = isDef;
    }
    ClubBFPlayerInfo.prototype.parsePlayer = function (pi) {
        this.id = pi.readInt64();
        this.name = pi.readUTF();
        this.career = pi.readByte();
        this.power = pi.readInt();
        this.winCount = pi.readShort();
    };
    ClubBFPlayerInfo.prototype.parseRobot = function (pi) {
        this.id = pi.readInt();
        this.tempID = pi.readInt();
        this.power = pi.readInt();
        this.isRobot = true;
    };
    return ClubBFPlayerInfo;
}());
//# sourceMappingURL=ClubBFPlayerInfo.js.map