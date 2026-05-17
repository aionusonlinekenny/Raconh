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
 * 副本控制器
 * luzhihong
 * create 2017-11-22
 */
var CopyControl = (function (_super) {
    __extends(CopyControl, _super);
    function CopyControl() {
        return _super.call(this) || this;
    }
    CopyControl.prototype.addCMD = function () {
        //通用
        Manager.socket.addCMD(Protocol.COPY_INFOS, CopyInfosCMD);
        Manager.socket.addCMD(Protocol.COPY_UPDATE, CopyUpdateCMD);
        Manager.socket.addCMD(Protocol.COPY_ENTER, CopyEnterCMD);
        Manager.socket.addCMD(Protocol.COPY_EXTI, CopyExitCMD);
        Manager.socket.addCMD(Protocol.COPY_RESULT, CopyResultCMD);
        Manager.socket.addCMD(Protocol.TOWER_COPY_KILL_END, TowerCopyKillEndCMD);
        Manager.socket.addCMD(Protocol.COPY_HOOK_POS, CopyHookPosCMD);
        Manager.socket.addCMD(Protocol.COPY_HOOK_POS_CANCEL, CopyHookPosCancelCMD);
        Manager.socket.addCMD(Protocol.COPY_RANK, CopyRankCMD);
        Manager.socket.addCMD(Protocol.COPY_END_TIME, CopyEndTimeCMD);
        Manager.socket.addCMD(Protocol.COPY_SAO_DANG, CopySaoDangCMD);
        Manager.socket.addCMD(Protocol.COPY_COUNT_DOWN, CopyCountdownCMD);
        Manager.socket.addCMD(Protocol.COPY_WAVE, CopyWaveCMD);
        //爬塔
        Manager.socket.addCMD(Protocol.TOWER_COPY_INFO, TowerCopyInfoCMD);
        //经验副本
        Manager.socket.addCMD(Protocol.COPY_EXP_INFO, CopyExpInfoCMD);
        Manager.socket.addCMD(Protocol.COPY_EXP_BUY_COUNT, CopyExpBuyCountCMD);
        Manager.socket.addCMD(Protocol.COPY_EXP_INSPIRE, CopyExpInspireCMD);
        Manager.socket.addCMD(Protocol.COPY_EXP_DATA, CopyExpDataCMD);
        Manager.socket.addCMD(Protocol.COPY_EXP_KILLS, CopyExpKillsCMD);
        Manager.socket.addCMD(Protocol.COPY_EXP_GAINS, CopyExpGainsCMD);
        Manager.socket.addCMD(Protocol.COPY_EXP_RESULT, CopyExpResultCMD);
        //银币
        Manager.socket.addCMD(Protocol.COPY_SILVER_COOLING, CopySilverCoolingCMD);
        Manager.socket.addCMD(Protocol.COPY_SILVER_MINI, CopySilverMiniCMD);
        Manager.socket.addCMD(Protocol.COPY_SILVER_RESULT, CopySilverResultCMD);
        Manager.socket.addCMD(Protocol.COPY_BUFF_UNLOCK, CopyBuffUnlockCMD);
        Manager.socket.addCMD(Protocol.COPY_SILVER_BOXES, CopySilverBoxesCMD);
        //副本引导
        Manager.socket.addCMD(Protocol.COPY_ASK_MONSTER, CopyAskMonsterCMD);
    };
    /*进入副本*/
    CopyControl.prototype.enter = function (id, cell) {
        if (cell === void 0) { cell = 0; }
        var cmd = Manager.socket.getCMD(Protocol.COPY_ENTER);
        cmd.id = id;
        cmd.cell = cell;
        cmd.send();
    };
    /*退出副本*/
    CopyControl.prototype.exit = function () {
        var cmd = Manager.socket.getCMD(Protocol.COPY_EXTI);
        // cmd.id = id;
        cmd.send();
    };
    /*
     * 副本扫荡
     * @param id:副本ID
    */
    CopyControl.prototype.saoDang = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.COPY_SAO_DANG);
        cmd.id = id;
        cmd.send();
    };
    /*
     * 副本排行
     * @param id:副本ID
     * @param index:0前三，1全部
    */
    CopyControl.prototype.getRank = function (id, index) {
        var cmd = Manager.socket.getCMD(Protocol.COPY_RANK);
        cmd.id = id;
        cmd.index = index;
        cmd.send();
    };
    /*
     * 经验副本购买进入次数
    */
    CopyControl.prototype.buyCount = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.COPY_EXP_BUY_COUNT);
        cmd.type = type;
        cmd.send();
    };
    /*
     * 经验副本升级经验加成
    */
    CopyControl.prototype.expUpRate = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.COPY_EXP_INSPIRE);
        cmd.type = type;
        cmd.send();
    };
    /*
     * buff解锁
    */
    CopyControl.prototype.buffUnlock = function () {
        var cmd = Manager.socket.getCMD(Protocol.COPY_BUFF_UNLOCK);
        cmd.send();
    };
    //界面-----------------------------------------
    /**
     * 失败结算弹出框
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
     */
    CopyControl.prototype.showFail = function (countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 3; }
        if (callback === void 0) { callback = null; }
        Manager.view.show(25 /* CopyResultFail */, countDownTime, callback);
    };
    /**
     * 成功结算弹出框
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
     */
    CopyControl.prototype.showWin = function (id, infos, countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 3; }
        if (callback === void 0) { callback = null; }
        if (infos && infos.length > 12)
            infos = infos.slice(0, 12);
        if (id == CopyConst.ID_TOWER) {
            var history_1 = Manager.model.getCopy().towerModel.history;
            var cvo = TowerCopyCVO.getCVO(history_1);
            if (cvo.unlockDesc.length > 0) {
                var cell = Number(cvo.unlockDesc[0]);
                var lifeId = Number(cvo.unlockDesc[1]);
                if (history_1 == cell) {
                    Manager.view.show(114 /* LifeGridUnLockedView */, infos, countDownTime, callback, lifeId);
                    return;
                }
            }
            if (Manager.model.getCopy().towerModel.canChallenge(false)) {
                Manager.view.show(62 /* TowerCopyWinView */, infos, countDownTime, callback);
                return;
            }
        }
        Manager.view.show(26 /* CopyResultWin */, infos, countDownTime, callback);
    };
    /**
     * 排行界面
     * @param id 副本ID
     */
    CopyControl.prototype.showRank = function (id) {
        Manager.view.show(24 /* CopyRankView */, id);
    };
    /**
     * 信息界面
     * @param id 副本ID
     */
    CopyControl.prototype.showInfoView = function (id) {
        Manager.view.show(23 /* CopyInfoView */, id);
    };
    /**副本通知后端刷怪，账号第一次进入副本特殊处理 */
    CopyControl.prototype.askMonster = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.COPY_ASK_MONSTER);
        cmd.copyID = id;
        cmd.send();
    };
    return CopyControl;
}(BaseControl));
__reflect(CopyControl.prototype, "CopyControl");
//# sourceMappingURL=CopyControl.js.map