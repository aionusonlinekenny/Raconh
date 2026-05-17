/**
 * 副本倒计时协议
 * luzhihong
 * create 2018.1.12
 */
class CopyCountdownCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_COUNT_DOWN;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let endTime:number = pi.readInt();
        Manager.view.show(ViewID.CopyCountDownView, endTime);
    }
}