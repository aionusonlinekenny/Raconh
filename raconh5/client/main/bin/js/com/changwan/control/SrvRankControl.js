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
 *
 * pzx
 * create 2018-3-15
 * 冲榜竞技Control
 *
*/
var SrvRankControl = /** @class */ (function (_super) {
    __extends(SrvRankControl, _super);
    function SrvRankControl() {
        return _super.call(this) || this;
    }
    SrvRankControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CMD_SRVRANK_QUERY, SrvRaknQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SRVRANK_REWARD, SrvRaknRewardCMD);
    };
    SrvRankControl.prototype.query = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SRVRANK_QUERY);
        cmd.send();
    };
    SrvRankControl.prototype.reward = function (rank) {
        var cmd = Manager.socket.getCMD(Protocol.CMD_SRVRANK_REWARD);
        cmd.rank = rank;
        cmd.send();
    };
    return SrvRankControl;
}(BaseControl));
//# sourceMappingURL=SrvRankControl.js.map