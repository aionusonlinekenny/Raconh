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
 * BOSS控制器
 * luzhihong
 * create 2017-12-23
 */
var BossControl = /** @class */ (function (_super) {
    __extends(BossControl, _super);
    function BossControl() {
        return _super.call(this) || this;
    }
    BossControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.BOSS_ENTER, BossEnterCMD);
        Manager.socket.addCMD(Protocol.BOSS_EXIT, BossExitCMD);
        Manager.socket.addCMD(Protocol.BOSS_INFOS, BossInfosCMD);
        Manager.socket.addCMD(Protocol.BOSS_ENTER_COUNT, BossEnterCountCMD);
        Manager.socket.addCMD(Protocol.BOSS_ATTENTION, BossAttentionCMD);
        Manager.socket.addCMD(Protocol.BOSS_NOTICE, BossNoticeCMD);
        Manager.socket.addCMD(Protocol.BOSS_ENEMY, BossEnemyCMD);
        Manager.socket.addCMD(Protocol.BOSS_HURT_RANK, BossHrutRankCMD);
        Manager.socket.addCMD(Protocol.BOSS_RESULT, BossResultCMD);
        Manager.socket.addCMD(Protocol.CMD_RAREDROP_QUERY, RareDropQueryCMD);
    };
    /*进入全民boss*/
    BossControl.prototype.enter = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.BOSS_ENTER);
        cmd.id = id;
        cmd.send();
    };
    /*退出全民boss*/
    BossControl.prototype.exit = function () {
        if (Manager.model.getMap().mapCVO.type != MapConst.TYPE_BOSS)
            return;
        var cmd = Manager.socket.getCMD(Protocol.BOSS_EXIT);
        cmd.send();
    };
    /*打开关闭全民boss*/
    BossControl.prototype.openOrClosePanel = function (isOpen) {
        var cmd = Manager.socket.getCMD(Protocol.BOSS_INFOS);
        cmd.isOpen = isOpen;
        cmd.send();
    };
    /*关注boss*/
    BossControl.prototype.attention = function (id, isAttention) {
        var cmd = Manager.socket.getCMD(Protocol.BOSS_ATTENTION);
        cmd.id = id;
        cmd.isAttention = isAttention;
        cmd.send();
    };
    /**
     * 成功结算弹出框
     * @param countDownTime 倒计时时间（秒）
     * @param callback 回调函数
     */
    BossControl.prototype.showWin = function (rank, infos, countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 3; }
        if (callback === void 0) { callback = null; }
        if (infos && infos.length > 6)
            infos = infos.slice(0, 6);
        Manager.view.show(69 /* BossResultWin */, rank, infos, countDownTime, callback);
    };
    /**
     * 珍希掉落查询
     */
    BossControl.prototype.rareDropQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.CMD_RAREDROP_QUERY);
        cmd.send();
    };
    return BossControl;
}(BaseControl));
//# sourceMappingURL=BossControl.js.map