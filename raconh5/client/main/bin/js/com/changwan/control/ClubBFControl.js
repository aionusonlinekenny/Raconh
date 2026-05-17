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
 * 盟会战Control
 * luzh
 * 2018.1.30
 */
var ClubBFControl = /** @class */ (function (_super) {
    __extends(ClubBFControl, _super);
    function ClubBFControl() {
        return _super.call(this) || this;
    }
    ClubBFControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CLUB_BF_1V1_RESULT, ClubBF1v1ResultCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_CHALLENGE_BOSS_RESULT, ClubBFChallengeBossResultCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_RESULT, ClubBFResultCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_PLAYER_INFO, ClubBFPlayerInfoCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_INFO, ClubBFInfoCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_POWERS, ClubBFPowersCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_ENTER, ClubBFEnterCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_GET_REWARDS, ClubBFGetRewardsCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_CLEAR_CD, ClubBFClearCDCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_LIST, ClubBFListCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_CHALLENGE_PLAYER, ClubBFChallengePlayerCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_CHALLENGE_BOSS, ClubBFChallengeBossCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_EXIT, ClubBFExitCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_ENTER_DOOR, ClubBFEnterDoorCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_BUY_BUFF, ClubBFBuyBuffCMD);
        Manager.socket.addCMD(Protocol.CLUB_BF_MINI_INFO, ClubBFMiniInfoCMD);
    };
    /**
     * 进入战场
     */
    ClubBFControl.prototype.enter = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_ENTER);
        cmd.send();
    };
    /**
     * 退出战场
     */
    ClubBFControl.prototype.exit = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_EXIT);
        cmd.send();
    };
    /**
     * 挑战玩家
     */
    ClubBFControl.prototype.challengePlayer = function (isRobot, id) {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_CHALLENGE_PLAYER);
        cmd.isRobot = isRobot;
        cmd.id = id;
        cmd.send();
    };
    /**
     * 挑战BOSS
     */
    ClubBFControl.prototype.challengeBoss = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_CHALLENGE_BOSS);
        cmd.send();
    };
    /**
     * 进入战场可挑战区
     */
    ClubBFControl.prototype.enterChallengeArea = function (isEnter) {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_ENTER_DOOR);
        cmd.isEnter = isEnter;
        cmd.send();
    };
    /**
     * 请求盟会战数据
     */
    ClubBFControl.prototype.reqInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_INFO);
        cmd.send();
    };
    /**
     * 请求盟会战力
     */
    ClubBFControl.prototype.reqClubPowers = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_POWERS);
        cmd.send();
    };
    /**
     * 请求盟会战内小界面数据
     */
    ClubBFControl.prototype.reqMiniInfos = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_MINI_INFO);
        cmd.send();
    };
    /**
     * 请求盟会战挑战列表数据
     */
    ClubBFControl.prototype.reqList = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_LIST);
        cmd.send();
    };
    /**
     * 领取积分奖励
     */
    ClubBFControl.prototype.getRewards = function (cvo) {
        if (cvo.hasGet)
            return;
        if (cvo.score > Manager.model.getClubBF().score) {
            FloatTips.addTips(LangCVO.getContent("clubBF30")); //积分不足
            return;
        }
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_GET_REWARDS);
        cmd.id = cvo.id;
        cmd.send();
    };
    /**
     * 购买盟会鼓舞buff加成
     */
    ClubBFControl.prototype.buyClubBuff = function () {
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_BUY_BUFF);
        cmd.send();
    };
    /**
     * 清除挑战cd
     */
    ClubBFControl.prototype.clearCD = function () {
        if (!ClubBFConfigCVO.clear_cd_cost.isEnough(true))
            return;
        var cmd = Manager.socket.getCMD(Protocol.CLUB_BF_CLEAR_CD);
        cmd.send();
    };
    ClubBFControl.prototype.showPKHead = function (id) {
        this._enemyID = id;
        Manager.render.add(this.chechShowPKHead, this, 1000);
    };
    ClubBFControl.prototype.hidePKHead = function () {
        Manager.render.remove(this.chechShowPKHead, this);
        Manager.view.hide(59 /* ArenaPKHeadView */);
    };
    ClubBFControl.prototype.chechShowPKHead = function () {
        var selfInfo = Manager.model.self;
        var enemyInfo = Manager.model.getGameobject().getGameObject(this._enemyID);
        if (selfInfo && enemyInfo) {
            Manager.render.remove(this.chechShowPKHead, this);
            if (Manager.model.getClubBF().isSelfDef)
                Manager.view.show(59 /* ArenaPKHeadView */, enemyInfo, selfInfo);
            else
                Manager.view.show(59 /* ArenaPKHeadView */, selfInfo, enemyInfo);
        }
    };
    return ClubBFControl;
}(BaseControl));
//# sourceMappingURL=ClubBFControl.js.map