/**
 * pzx 
 * 18.1.15
     * 投资Control
     */
class SysInvestControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_SYSINVEST_QUERY,SysInvestQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_SYSINVEST_REWARD,SysInvestRewardCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:SysInvestQueryCMD = Manager.socket.getCMD(Protocol.CMD_SYSINVEST_QUERY) as SysInvestQueryCMD;
        cmd.send();
    }

    public reward(id:number):void
    {
        let cmd:SysInvestRewardCMD = Manager.socket.getCMD(Protocol.CMD_SYSINVEST_REWARD) as SysInvestRewardCMD;
        cmd.id = id;
        cmd.send();
    }
}