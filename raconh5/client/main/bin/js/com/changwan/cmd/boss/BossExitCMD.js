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
 * BOSS退出协议
 * luzhihong
 * create 2018.1.2
 */
var BossExitCMD = /** @class */ (function (_super) {
    __extends(BossExitCMD, _super);
    function BossExitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_EXIT;
        return _this;
    }
    BossExitCMD.prototype.receive = function (pi) {
        var id = pi.readByte();
        Manager.view.hide(32 /* BossEnemyView */);
        var bossStrip = Manager.view.getView(36 /* BossBloodStrip */);
        if (bossStrip)
            bossStrip.removeHurtRankView();
    };
    return BossExitCMD;
}(BaseCMD));
//# sourceMappingURL=BossExitCMD.js.map