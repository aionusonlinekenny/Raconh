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
 * luzhihong
 * create 2017-12-27
 */
var BossEvent = /** @class */ (function (_super) {
    __extends(BossEvent, _super);
    function BossEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //BOSS信息更新（血量和重生时间）
    BossEvent.BLOOD_INFO = "BLOOD_INFO";
    //BOSS复活或击杀更新
    BossEvent.KILLED_OR_REVIVE = "KILLED_OR_REVIVE";
    //BOSS挑战次数更新
    BossEvent.CHALLENGE_TIMES = "CHALLENGE_TIMES";
    //BOSS关注更新
    BossEvent.ATTENTION = "ATTENTION";
    //敌对玩家列表更新
    BossEvent.ENEMY_LIST = "ENEMY_LIST";
    //伤害排名更新
    BossEvent.RANK_LIST = "RANK_LIST";
    //珍希掉落
    BossEvent.RAREDROP_QUIER_EVENT = "RAREDROP_QUIER_EVENT";
    return BossEvent;
}(BaseEvent));
//# sourceMappingURL=BossEvent.js.map