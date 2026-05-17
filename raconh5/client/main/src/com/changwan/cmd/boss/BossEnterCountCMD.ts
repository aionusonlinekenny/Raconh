/**
 * BOSS进入次数和恢复时间协议
 * luzhihong
 * create 2018.1.2
 */
class BossEnterCountCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_ENTER_COUNT;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getBoss().setNumAndTime(pi.readByte(), pi.readInt());
    }
}