/**
 * pzx 
 * 17.12.16
     * 预告Control
     */
class SysnoticeControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_SYSNOTICE_QUERY,SysnoticeQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_SYSNOTICE_REWARD,SysnoticeRewardCMD);
         Manager.socket.addCMD(Protocol.CMD_UPD_NOTICE,UpdNoticCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:SysnoticeQueryCMD = Manager.socket.getCMD(Protocol.CMD_SYSNOTICE_QUERY) as SysnoticeQueryCMD;
        cmd.send();
    }

    public reward(taskid:number):void
    {
        let cmd:SysnoticeRewardCMD = Manager.socket.getCMD(Protocol.CMD_SYSNOTICE_REWARD) as SysnoticeRewardCMD;
        cmd.taskid = taskid;
        cmd.send();
    }
    /** 游戏公告 */
    public updNotice():void
    {
        let cmd:UpdNoticCMD = Manager.socket.getCMD(Protocol.CMD_UPD_NOTICE) as UpdNoticCMD;
        cmd.send();
    }
}