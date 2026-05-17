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
 * 冲榜竞技领奖
 *  */
var SrvRaknRewardCMD = /** @class */ (function (_super) {
    __extends(SrvRaknRewardCMD, _super);
    function SrvRaknRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SRVRANK_REWARD;
        return _this;
    }
    SrvRaknRewardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.rank);
    };
    SrvRaknRewardCMD.prototype.receive = function (ip) {
        var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        if (day < 8) {
            var rank = ip.readByte();
            var statu = ip.readByte();
            SrvRankCVO.setstatus(day, rank, statu);
            Manager.model.getsrvRank().reward();
        }
    };
    return SrvRaknRewardCMD;
}(BaseCMD));
//# sourceMappingURL=SrvRaknRewardCMD.js.map