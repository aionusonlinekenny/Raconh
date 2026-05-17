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
 * 领取个人积分奖励协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFGetRewardsCMD = (function (_super) {
    __extends(ClubBFGetRewardsCMD, _super);
    function ClubBFGetRewardsCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_GET_REWARDS;
        return _this;
    }
    ClubBFGetRewardsCMD.prototype.processOut = function (pkg) {
        // array('name' => 'score_id', 'type' => 'int16', 'desc' => '个人积分奖励id'),
        pkg.writeShort(this.id);
    };
    ClubBFGetRewardsCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        Manager.model.getClubBF().addGetID(id);
    };
    return ClubBFGetRewardsCMD;
}(BaseCMD));
__reflect(ClubBFGetRewardsCMD.prototype, "ClubBFGetRewardsCMD");
//# sourceMappingURL=ClubBFGetRewardsCMD.js.map