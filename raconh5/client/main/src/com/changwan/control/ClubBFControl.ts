/**
 * 盟会战Control
 * luzh
 * 2018.1.30
 */
class ClubBFControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
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
    }
    /**
     * 进入战场
     */
    public enter():void
    {
        let cmd:ClubBFEnterCMD = Manager.socket.getCMD(Protocol.CLUB_BF_ENTER) as ClubBFEnterCMD;
        cmd.send();
    }
    /**
     * 退出战场
     */
    public exit():void
    {
        let cmd:ClubBFExitCMD = Manager.socket.getCMD(Protocol.CLUB_BF_EXIT) as ClubBFExitCMD;
        cmd.send();
    }
    /**
     * 挑战玩家
     */
    public challengePlayer(isRobot:boolean, id:number):void
    {
        let cmd:ClubBFChallengePlayerCMD = Manager.socket.getCMD(Protocol.CLUB_BF_CHALLENGE_PLAYER) as ClubBFChallengePlayerCMD;
        cmd.isRobot = isRobot;
        cmd.id = id;
        cmd.send();
    }
    /**
     * 挑战BOSS
     */
    public challengeBoss():void
    {
        let cmd:ClubBFChallengeBossCMD = Manager.socket.getCMD(Protocol.CLUB_BF_CHALLENGE_BOSS) as ClubBFChallengeBossCMD;
        cmd.send();
    }
    /**
     * 进入战场可挑战区
     */
    public enterChallengeArea(isEnter:boolean):void
    {
        let cmd:ClubBFEnterDoorCMD = Manager.socket.getCMD(Protocol.CLUB_BF_ENTER_DOOR) as ClubBFEnterDoorCMD;
        cmd.isEnter = isEnter;
        cmd.send();
    }
    /**
     * 请求盟会战数据
     */
    public reqInfo():void
    {
        let cmd:ClubBFInfoCMD = Manager.socket.getCMD(Protocol.CLUB_BF_INFO) as ClubBFInfoCMD;
        cmd.send();
    }
    /**
     * 请求盟会战力
     */
    public reqClubPowers():void
    {
        let cmd:ClubBFPowersCMD = Manager.socket.getCMD(Protocol.CLUB_BF_POWERS) as ClubBFPowersCMD;
        cmd.send();
    }
    /**
     * 请求盟会战内小界面数据
     */
    public reqMiniInfos():void
    {
        let cmd:ClubBFMiniInfoCMD = Manager.socket.getCMD(Protocol.CLUB_BF_MINI_INFO) as ClubBFMiniInfoCMD;
        cmd.send();
    }
    /**
     * 请求盟会战挑战列表数据
     */
    public reqList():void
    {
        let cmd:ClubBFListCMD = Manager.socket.getCMD(Protocol.CLUB_BF_LIST) as ClubBFListCMD;
        cmd.send();
    }
    /**
     * 领取积分奖励
     */
    public getRewards(cvo:ClubBFScoreRewardsCVO):void
    {
        if(cvo.hasGet) return;
        if(cvo.score > Manager.model.getClubBF().score) 
        {
            FloatTips.addTips(LangCVO.getContent("clubBF30"));//积分不足
            return;
        }
        let cmd:ClubBFGetRewardsCMD = Manager.socket.getCMD(Protocol.CLUB_BF_GET_REWARDS) as ClubBFGetRewardsCMD;
        cmd.id = cvo.id;
        cmd.send();
    }
    /**
     * 购买盟会鼓舞buff加成
     */
    public buyClubBuff():void
    {
        let cmd:ClubBFBuyBuffCMD = Manager.socket.getCMD(Protocol.CLUB_BF_BUY_BUFF) as ClubBFBuyBuffCMD;
        cmd.send();
    }
    /**
     * 清除挑战cd
     */
    public clearCD():void
    {
        if(!ClubBFConfigCVO.clear_cd_cost.isEnough(true)) return;
        let cmd:ClubBFClearCDCMD = Manager.socket.getCMD(Protocol.CLUB_BF_CLEAR_CD) as ClubBFClearCDCMD;
        cmd.send();
    }





    //----------------------------------------------
    
    private _enemyID:number;
    public showPKHead(id:number):void
    {
        this._enemyID = id;
        Manager.render.add(this.chechShowPKHead, this, 1000);
    }
    public hidePKHead():void
    {
        Manager.render.remove(this.chechShowPKHead, this);
        Manager.view.hide(ViewID.ArenaPKHeadView);
    }
    private chechShowPKHead():void
    {
        let selfInfo:AliveGameObjectInfo = Manager.model.self;
        let enemyInfo:AliveGameObjectInfo = Manager.model.getGameobject().getGameObject(this._enemyID) as AliveGameObjectInfo;
        if(selfInfo && enemyInfo)
        {
            Manager.render.remove(this.chechShowPKHead, this);
            if(Manager.model.getClubBF().isSelfDef) Manager.view.show(ViewID.ArenaPKHeadView, enemyInfo, selfInfo);
            else  Manager.view.show(ViewID.ArenaPKHeadView, selfInfo, enemyInfo);
        }
    }
}