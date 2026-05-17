/**
 * 副本控制器
 * luzhihong
 * create 2017-11-22
 */
class CopyControl extends BaseControl
{

    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
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
    }

    /*进入副本*/
    public enter(id:number, cell:number = 0):void
    {
        let cmd:CopyEnterCMD = Manager.socket.getCMD(Protocol.COPY_ENTER) as CopyEnterCMD;
        cmd.id = id;
        cmd.cell = cell;
        cmd.send();
    }
    /*退出副本*/
    public exit():void
    {
        let cmd:CopyExitCMD = Manager.socket.getCMD(Protocol.COPY_EXTI) as CopyExitCMD;
        // cmd.id = id;
        cmd.send();
    }
    /*
     * 副本扫荡
	 * @param id:副本ID
    */
    public saoDang(id:number):void
    {
        let cmd:CopySaoDangCMD = Manager.socket.getCMD(Protocol.COPY_SAO_DANG) as CopySaoDangCMD;
        cmd.id = id;
        cmd.send();
    }
    /*
     * 副本排行
	 * @param id:副本ID
	 * @param index:0前三，1全部
    */
    public getRank(id:number, index:number):void
    {
        let cmd:CopyRankCMD = Manager.socket.getCMD(Protocol.COPY_RANK) as CopyRankCMD;
        cmd.id = id;
        cmd.index = index;
        cmd.send();
    }

    /*
     * 经验副本购买进入次数
    */
    public buyCount(type:number):void
    {
        let cmd:CopyExpBuyCountCMD = Manager.socket.getCMD(Protocol.COPY_EXP_BUY_COUNT) as CopyExpBuyCountCMD;
        cmd.type = type;
        cmd.send();
    }    
    /*
     * 经验副本升级经验加成
    */
    public expUpRate(type:number):void
    {
        let cmd:CopyExpInspireCMD = Manager.socket.getCMD(Protocol.COPY_EXP_INSPIRE) as CopyExpInspireCMD;
        cmd.type = type;
        cmd.send();
    }
    
    /*
     * buff解锁
    */
    public buffUnlock():void
    {
        let cmd:CopyBuffUnlockCMD = Manager.socket.getCMD(Protocol.COPY_BUFF_UNLOCK) as CopyBuffUnlockCMD;
        cmd.send();
    }
    

    //界面-----------------------------------------
    /** 
     * 失败结算弹出框
	 * @param textContent 倒计时时间（秒）
	 * @param okCallback 回调函数
     */
    public showFail(countDownTime:number = 3, callback:Function = null):void
    {
        Manager.view.show(ViewID.CopyResultFail, countDownTime, callback);
    }
    /** 
     * 成功结算弹出框
	 * @param textContent 倒计时时间（秒）
	 * @param okCallback 回调函数
     */
    public showWin(id:number, infos:Array<ItemsModelInfo>, countDownTime:number = 3, callback:Function = null):void
    {
        if(infos && infos.length > 12) infos = infos.slice(0, 12);
        if(id == CopyConst.ID_TOWER)
        {
            let history:number = Manager.model.getCopy().towerModel.history;
            let cvo:TowerCopyCVO = TowerCopyCVO.getCVO(history);
            if(cvo.unlockDesc.length>0)
            {
                let cell:number = Number(cvo.unlockDesc[0]);
                let lifeId:number = Number(cvo.unlockDesc[1]);
                if(history == cell)
                {
                    Manager.view.show(ViewID.LifeGridUnLockedView, infos, countDownTime, callback,lifeId);
                    return;
                }
            }
            
            if(Manager.model.getCopy().towerModel.canChallenge(false))
            {
                Manager.view.show(ViewID.TowerCopyWinView, infos, countDownTime, callback);
                return;
            }
        }
        Manager.view.show(ViewID.CopyResultWin, infos, countDownTime, callback);
    }
    /** 
     * 排行界面
	 * @param id 副本ID
     */
    public showRank(id:number):void
    {
        Manager.view.show(ViewID.CopyRankView, id);
    }
    /** 
     * 信息界面
	 * @param id 副本ID
     */
    public showInfoView(id:number):void
    {
        Manager.view.show(ViewID.CopyInfoView, id);
    }

    /**副本通知后端刷怪，账号第一次进入副本特殊处理 */
    public askMonster(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.COPY_ASK_MONSTER) as CopyAskMonsterCMD;
        cmd.copyID = id;
        cmd.send();
    }
}