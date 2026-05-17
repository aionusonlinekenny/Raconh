/**
 * BOSS控制器
 * luzhihong
 * create 2017-12-23
 */
class BossControl extends BaseControl
{

    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.BOSS_ENTER, BossEnterCMD);
        Manager.socket.addCMD(Protocol.BOSS_EXIT, BossExitCMD);
        Manager.socket.addCMD(Protocol.BOSS_INFOS, BossInfosCMD);
        Manager.socket.addCMD(Protocol.BOSS_ENTER_COUNT, BossEnterCountCMD);
        Manager.socket.addCMD(Protocol.BOSS_ATTENTION, BossAttentionCMD);
        Manager.socket.addCMD(Protocol.BOSS_NOTICE, BossNoticeCMD);
        Manager.socket.addCMD(Protocol.BOSS_ENEMY, BossEnemyCMD);
        Manager.socket.addCMD(Protocol.BOSS_HURT_RANK, BossHrutRankCMD);
        Manager.socket.addCMD(Protocol.BOSS_RESULT, BossResultCMD);
        Manager.socket.addCMD(Protocol.CMD_RAREDROP_QUERY,RareDropQueryCMD);
    }

    /*进入全民boss*/
    public enter(id:number):void
    {
        let cmd:BossEnterCMD = Manager.socket.getCMD(Protocol.BOSS_ENTER) as BossEnterCMD;
        cmd.id = id;
        cmd.send();
    }
    
    /*退出全民boss*/
    public exit():void
    {
        if(Manager.model.getMap().mapCVO.type != MapConst.TYPE_BOSS)return;
        let cmd:BossExitCMD = Manager.socket.getCMD(Protocol.BOSS_EXIT) as BossExitCMD;
        cmd.send();
    }
    
    /*打开关闭全民boss*/
    public openOrClosePanel(isOpen:boolean):void
    {
        let cmd:BossInfosCMD = Manager.socket.getCMD(Protocol.BOSS_INFOS) as BossInfosCMD;
        cmd.isOpen = isOpen;
        cmd.send();
    }
    
    /*关注boss*/
    public attention(id:number, isAttention:boolean):void
    {
        let cmd:BossAttentionCMD = Manager.socket.getCMD(Protocol.BOSS_ATTENTION) as BossAttentionCMD;
        cmd.id = id;
        cmd.isAttention = isAttention;
        cmd.send();
    }


    
    /** 
     * 成功结算弹出框
	 * @param countDownTime 倒计时时间（秒）
	 * @param callback 回调函数
     */
    public showWin(rank:number, infos:Array<ItemsModelInfo>, countDownTime:number = 3, callback:Function = null):void
    {
        if(infos && infos.length > 6) infos = infos.slice(0, 6);
        Manager.view.show(ViewID.BossResultWin, rank, infos, countDownTime, callback);
    }

/**
 * 珍希掉落查询
 */
    public rareDropQuery():void
    {
        let cmd:RareDropQueryCMD = Manager.socket.getCMD(Protocol.CMD_RAREDROP_QUERY) as RareDropQueryCMD;
        cmd.send();
    }
}