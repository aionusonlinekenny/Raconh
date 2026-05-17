/**
 * pzx 
 * 18.1.3
     * 充值control
     */
class SysChargeControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_SYSCHARGE_QUERY,SysChargeQueryCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:SysChargeQueryCMD = Manager.socket.getCMD(Protocol.CMD_SYSCHARGE_QUERY) as SysChargeQueryCMD;
        cmd.send();
    }
}