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
 * BOSS伤害信息
 * luzhihong
 * create 2018.1.2
 */
var BossHrutRankCMD = /** @class */ (function (_super) {
    __extends(BossHrutRankCMD, _super);
    function BossHrutRankCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_HURT_RANK;
        return _this;
    }
    BossHrutRankCMD.prototype.receive = function (pi) {
        var list = [];
        var info = new BossPlayerInfo();
        info.rank = pi.readShort(); //自己的排名
        info.hurt = pi.readInt64(); //自己的伤害值
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
            bossStrip.addHurtRankView(list, BossRankView.TYPE_DMG);
        // Manager.model.getBoss().dispatchEvent(new BossEvent(BossEvent.RANK_LIST, list));
    };
    return BossHrutRankCMD;
}(BaseCMD));
//# sourceMappingURL=BossHrutRankCMD.js.map