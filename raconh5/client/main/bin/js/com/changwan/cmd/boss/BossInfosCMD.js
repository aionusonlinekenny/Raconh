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
 * BOSS信息
 * luzhihong
 * create 2018.1.2
 */
var BossInfosCMD = /** @class */ (function (_super) {
    __extends(BossInfosCMD, _super);
    function BossInfosCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_INFOS;
        return _this;
    }
    BossInfosCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.isOpen ? 1 : 0);
    };
    BossInfosCMD.prototype.receive = function (pi) {
        var hasKillUpdate = false;
        var len = pi.readShort();
        while (len--) {
            var id = pi.readByte();
            var cvo = BossCVO.getCVO(id);
            if (cvo) {
                var lastBlood = cvo.curBlood;
                cvo.setBossInfo(pi.readInt64(), pi.readInt64(), pi.readInt());
                if (!hasKillUpdate) {
                    hasKillUpdate = (lastBlood == 0 && cvo.curBlood > 0) || (lastBlood > 0 && cvo.curBlood == 0);
                }
            }
        }
        //BOSS复活或击杀更新(排序用)
        if (hasKillUpdate)
            Manager.model.getBoss().dispatchEvent(new BossEvent(BossEvent.KILLED_OR_REVIVE));
    };
    return BossInfosCMD;
}(BaseCMD));
//# sourceMappingURL=BossInfosCMD.js.map