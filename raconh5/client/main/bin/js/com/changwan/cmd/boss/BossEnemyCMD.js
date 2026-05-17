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
 * BOSS敌对玩家信息
 * luzhihong
 * create 2018.1.2
 */
var BossEnemyCMD = /** @class */ (function (_super) {
    __extends(BossEnemyCMD, _super);
    function BossEnemyCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_ENEMY;
        return _this;
    }
    BossEnemyCMD.prototype.receive = function (pi) {
        var list = [];
        var info;
        var len = pi.readShort();
        while (len--) {
            var id = pi.readInt64();
            info = Manager.model.getBoss().getEnemyByID(id);
            if (info == null) {
                info = new BossPlayerInfo();
                info.id = id;
            }
            info.name = pi.readUTF();
            info.career = pi.readByte();
            info.power = pi.readInt();
            info.curBlood = pi.readInt64();
            info.totalBlood = pi.readInt64();
            list.push(info);
        }
        Manager.model.getBoss().enemyList = list;
    };
    return BossEnemyCMD;
}(BaseCMD));
//# sourceMappingURL=BossEnemyCMD.js.map