/**
 * pzx 
 * 18.1.15
     * 福利Control
     */
class CashCowControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_CASHCOW_QUERY,CashCowQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_CASHCOW_REWARD,CashCowRewardCMD);

         Manager.socket.addCMD(Protocol.CMD_LEVITEM_QUERY,LevItemQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_LEVITEM_REWARD,LevItemRewardCMD);

         Manager.socket.addCMD(Protocol.CMD_SEVENDAYS_QUERY,SevenDaysQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_SEVENDAYS_REWARD,SevenDaysRewardCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:CashCowQueryCMD = Manager.socket.getCMD(Protocol.CMD_CASHCOW_QUERY) as CashCowQueryCMD;
        cmd.send();
    }

    public reward():void
    {
        let cmd:CashCowRewardCMD = Manager.socket.getCMD(Protocol.CMD_CASHCOW_REWARD) as CashCowRewardCMD;
        cmd.send();
    }
/** 冲级好礼查询 */
    public levItemQuery():void
    {
        let cmd:LevItemQueryCMD = Manager.socket.getCMD(Protocol.CMD_LEVITEM_QUERY) as LevItemQueryCMD;
        cmd.send();
    }
    /** 冲级好礼奖励 */
    public rewardLevItem(id:number):void
    {
        let cmd:LevItemRewardCMD = Manager.socket.getCMD(Protocol.CMD_LEVITEM_REWARD) as LevItemRewardCMD;
        cmd.id = id;
        cmd.send();
    }

    /** 七天登陆查询 */
    public sevenDaysQuery():void
    {
        let cmd:SevenDaysQueryCMD = Manager.socket.getCMD(Protocol.CMD_SEVENDAYS_QUERY) as SevenDaysQueryCMD;
        cmd.send();
    }
    /** 七天登陆奖励 */
    public sevenDaysReward(id:number):void
    {
        let cmd:SevenDaysRewardCMD = Manager.socket.getCMD(Protocol.CMD_SEVENDAYS_REWARD) as SevenDaysRewardCMD;
        cmd.login_id = id;
        cmd.send();
    }
}