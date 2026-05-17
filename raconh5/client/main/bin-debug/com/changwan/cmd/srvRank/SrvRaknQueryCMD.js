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
 * pzx
 * 18.3.21
 * 冲榜竞技
 *  */
var SrvRaknQueryCMD = (function (_super) {
    __extends(SrvRaknQueryCMD, _super);
    function SrvRaknQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SRVRANK_QUERY;
        return _this;
    }
    SrvRaknQueryCMD.prototype.receive = function (ip) {
        var day = ip.readByte();
        if (day < 8) {
            var ln = ip.readShort();
            for (var i = 0; i < ln; i++) {
                var rank = ip.readByte();
                var statu = ip.readByte();
                SrvRankCVO.setstatus(day, rank, statu);
            }
            var rank1Name = ip.readUTF();
            var mainRank = ip.readShort();
            Manager.model.getsrvRank().returnQuery(mainRank, rank1Name);
        }
    };
    return SrvRaknQueryCMD;
}(BaseCMD));
__reflect(SrvRaknQueryCMD.prototype, "SrvRaknQueryCMD");
//# sourceMappingURL=SrvRaknQueryCMD.js.map