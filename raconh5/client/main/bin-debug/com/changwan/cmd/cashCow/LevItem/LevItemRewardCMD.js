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
 * 18.1.18
 * 冲级好礼领奖
 *  */
var LevItemRewardCMD = (function (_super) {
    __extends(LevItemRewardCMD, _super);
    function LevItemRewardCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LEVITEM_REWARD;
        return _this;
    }
    LevItemRewardCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
    };
    LevItemRewardCMD.prototype.receive = function (ip) {
        var id = ip.readByte();
        LevItemCVO.setCount(id, 1, -1);
        Manager.model.getcashCow().levItemModel.reward(id);
    };
    return LevItemRewardCMD;
}(BaseCMD));
__reflect(LevItemRewardCMD.prototype, "LevItemRewardCMD");
//# sourceMappingURL=LevItemRewardCMD.js.map