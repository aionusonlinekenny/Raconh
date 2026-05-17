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
var LairdCatchCMD = (function (_super) {
    __extends(LairdCatchCMD, _super);
    function LairdCatchCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_CATCH;
        return _this;
    }
    LairdCatchCMD.prototype.processOut = function (pkg) {
        // pkg.writeByte(this.trainingType);
    };
    LairdCatchCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new LairdCatchInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.fight = pi.readInt();
            info.status = pi.readByte();
            info.catchType = pi.readByte();
            info.timeStamp = pi.readInt();
            info.lordName = pi.readUTF();
            list.push(info);
        }
        list.reverse();
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_CATCH_INFO_UPDATE, list));
    };
    return LairdCatchCMD;
}(BaseCMD));
__reflect(LairdCatchCMD.prototype, "LairdCatchCMD");
//# sourceMappingURL=LairdCatchCMD.js.map