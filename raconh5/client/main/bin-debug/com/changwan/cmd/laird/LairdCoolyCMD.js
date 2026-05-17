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
var LairdCoolyCMD = (function (_super) {
    __extends(LairdCoolyCMD, _super);
    function LairdCoolyCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_COOLY;
        return _this;
    }
    LairdCoolyCMD.prototype.processOut = function (pkg) {
        // pkg.writeByte(this.trainingType);
    };
    LairdCoolyCMD.prototype.receive = function (pi) {
        var model = Manager.model.getLaird();
        model.curStatus = pi.readByte();
        model.lordInfoList = [];
        var len1 = pi.readShort();
        for (var i = 0; i < len1; i++) {
            var info = new LordInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.guildName = pi.readUTF();
            model.lordInfoList.push(info);
        }
        model.coolyInfoList = [];
        var len2 = pi.readShort();
        for (var i = 0; i < len2; i++) {
            var info = new CoolyInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.fight = pi.readInt();
            info.clubName = pi.readUTF();
            if (info.clubName == "") {
                var num = Math.floor(Math.random() * 3) + 17;
                info.clubName = LangCVO.getContent("club" + num);
            }
            info.catchTimes = pi.readInt();
            info.freeTimes = pi.readInt();
            info.pickSec = pi.readInt();
            info.isPickAll = pi.readByte();
            model.coolyInfoList.push(info);
        }
        model.dispatchEvent(new LairdEvent(LairdEvent.COOLY_INFO_UPDATE));
    };
    return LairdCoolyCMD;
}(BaseCMD));
__reflect(LairdCoolyCMD.prototype, "LairdCoolyCMD");
//# sourceMappingURL=LairdCoolyCMD.js.map