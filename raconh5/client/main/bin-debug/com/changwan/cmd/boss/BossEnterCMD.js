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
 * BOSS进入协议
 * luzhihong
 * create 2018.1.2
 */
var BossEnterCMD = (function (_super) {
    __extends(BossEnterCMD, _super);
    function BossEnterCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_ENTER;
        return _this;
    }
    BossEnterCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
    };
    BossEnterCMD.prototype.receive = function (pi) {
        var id = pi.readByte();
        var cvo = BossCVO.getCVO(id);
        if (cvo.pkMode > 0)
            Manager.view.show(32 /* BossEnemyView */);
    };
    return BossEnterCMD;
}(BaseCMD));
__reflect(BossEnterCMD.prototype, "BossEnterCMD");
//# sourceMappingURL=BossEnterCMD.js.map