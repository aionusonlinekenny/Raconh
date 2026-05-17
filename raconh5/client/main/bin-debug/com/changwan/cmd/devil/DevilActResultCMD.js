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
 * 魔神降临活动结算数据
 * liangyan
 * create 2018-04-10
*/
var DevilActResultCMD = (function (_super) {
    __extends(DevilActResultCMD, _super);
    function DevilActResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_ACT_RESULT;
        return _this;
    }
    DevilActResultCMD.prototype.receive = function (pi) {
        var resultInfo = new DevilResultInfo();
        resultInfo.kingInfo = new DevilKingInfo();
        resultInfo.kingInfo.id = pi.readInt64();
        resultInfo.kingInfo.name = pi.readUTF();
        resultInfo.kingInfo.career = pi.readByte();
        resultInfo.kingInfo.fight = pi.readInt();
        resultInfo.kingInfo.clubType = pi.readByte();
        resultInfo.kingInfo.clothes = pi.readShort();
        resultInfo.kingInfo.weapon = pi.readShort();
        resultInfo.kingInfo.wing = pi.readShort();
        resultInfo.myScore = pi.readInt();
        resultInfo.myRank = pi.readInt();
        var count = pi.readShort();
        var goodsInfo;
        resultInfo.rewards = [];
        while (count > 0) {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.id = count;
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            var extraCount = pi.readShort();
            var extraInfo = void 0;
            for (var i = 0; i < extraCount; i++) {
                extraInfo = new ExattrItemsinfo();
                extraInfo.type = pi.readShort();
                extraInfo.target = pi.readInt();
                extraInfo.value = pi.readInt();
                extraInfo.desc = pi.readUTF();
                goodsInfo.infoList.push(extraInfo);
            }
            resultInfo.rewards.push(goodsInfo);
            count--;
        }
        Manager.model.getDevil().resultInfo = resultInfo;
        Manager.view.show(142 /* DevilResultView */);
    };
    return DevilActResultCMD;
}(BaseCMD));
__reflect(DevilActResultCMD.prototype, "DevilActResultCMD");
//# sourceMappingURL=DevilActResultCMD.js.map