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
 * 魔神降临请求排名列表(跟20407字段一样)
 * liangyan
 * create 2018-04-10
*/
var DevilRankListCMD = (function (_super) {
    __extends(DevilRankListCMD, _super);
    function DevilRankListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_RANK_LIST;
        return _this;
    }
    DevilRankListCMD.prototype.receive = function (pi) {
        var list = [];
        var info = new BossPlayerInfo();
        info.rank = pi.readShort(); //自己的排名
        info.hurt = pi.readInt64(); //自己的积分
        list.push(info);
        var len = pi.readShort();
        for (var i = 1; i <= len; i++) {
            info = new BossPlayerInfo();
            info.rank = i;
            info.name = pi.readUTF();
            info.hurt = pi.readInt64();
            list.push(info);
        }
        var bossStrip = Manager.view.getView(36 /* BossBloodStrip */);
        if (bossStrip)
            bossStrip.addHurtRankView(list, BossRankView.TYPE_SCORE);
    };
    return DevilRankListCMD;
}(BaseCMD));
__reflect(DevilRankListCMD.prototype, "DevilRankListCMD");
//# sourceMappingURL=DevilRankListCMD.js.map