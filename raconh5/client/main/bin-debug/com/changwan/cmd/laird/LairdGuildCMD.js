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
var LairdGuildCMD = (function (_super) {
    __extends(LairdGuildCMD, _super);
    function LairdGuildCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_GUILD;
        return _this;
    }
    LairdGuildCMD.prototype.processOut = function (pkg) {
        // pkg.writeByte(this.trainingType);
    };
    LairdGuildCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new LairdClubMemberInfo();
            info.playerId = pi.readInt64();
            if (info.playerId == Manager.model.self.id)
                continue;
            info.nickName = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.fight = pi.readInt();
            info.status = pi.readByte();
            info.isSeekHelp = pi.readByte();
            info.catchTime = pi.readInt();
            info.lordName = pi.readUTF();
            list.push(info);
        }
        list.sort(this.sortByFight);
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, list));
    };
    LairdGuildCMD.prototype.sortByFight = function (value1, value2) {
        if (value1.fight < value2.fight)
            return 1;
        else if (value1.fight > value2.fight)
            return -1;
        else
            return 0;
    };
    return LairdGuildCMD;
}(BaseCMD));
__reflect(LairdGuildCMD.prototype, "LairdGuildCMD");
//# sourceMappingURL=LairdGuildCMD.js.map