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
 * 火眼金睛领取奖励
 * liangyan
 * create 2018-03-27
*/
var FireEyeFetchRewardsCMD = (function (_super) {
    __extends(FireEyeFetchRewardsCMD, _super);
    function FireEyeFetchRewardsCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_FETCH;
        return _this;
    }
    FireEyeFetchRewardsCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    FireEyeFetchRewardsCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        var count = pi.readShort();
        var goodsInfo;
        while (count > 0) {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            count--;
        }
        if (Manager.model.getFireEye().fetchedRewards.indexOf(id) == -1) {
            Manager.model.getFireEye().fetchedRewards.push(id);
            Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS));
        }
    };
    return FireEyeFetchRewardsCMD;
}(BaseCMD));
__reflect(FireEyeFetchRewardsCMD.prototype, "FireEyeFetchRewardsCMD");
//# sourceMappingURL=FireEyeFetchRewardsCMD.js.map