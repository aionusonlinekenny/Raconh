/**
 * pzx 
 * 18.1.6
     * 充值豪礼control
     */
class FirstChargeControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_FIRSTCHARGE,FitstChargeQueryCMD);
    }
    /**
     * 领奖
     */
    public reward():void
    {
        let cmd:FitstChargeQueryCMD = Manager.socket.getCMD(Protocol.CMD_FIRSTCHARGE) as FitstChargeQueryCMD;
        cmd.send();
    }
}