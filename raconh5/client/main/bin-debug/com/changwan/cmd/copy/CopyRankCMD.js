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
 * 主线副本排行协议
 * luzhihong
 * create 2017.12.4
 */
var CopyRankCMD = (function (_super) {
    __extends(CopyRankCMD, _super);
    function CopyRankCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_RANK;
        return _this;
    }
    CopyRankCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.id);
        pkg.writeByte(this.index);
    };
    CopyRankCMD.prototype.receive = function (pi) {
        var id = pi.readInt(); //副本ID
        var index = pi.readByte(); //0前三，1全部
        var len = pi.readShort();
        var infos = [];
        var info;
        for (var i = 1; i <= len; i++) {
            info = new CopyRankInfo();
            info.rank = i;
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.value = pi.readShort();
            info.power = pi.readInt();
            infos.push(info);
        }
        Manager.model.getCopy().dispatchEvent(new CopyEvent(CopyEvent.UPDATE_RANK, [id, index, infos]));
    };
    return CopyRankCMD;
}(BaseCMD));
__reflect(CopyRankCMD.prototype, "CopyRankCMD");
//# sourceMappingURL=CopyRankCMD.js.map