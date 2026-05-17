/**
 * 银币副本buff时间
 * luzhihong
 * create 2018.1.20
 */
class CopyBuffUnlockCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_BUFF_UNLOCK;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let totalTime:number = pi.readByte();
        let endTime:number = pi.readInt();

        let left:number = endTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000;
        if(left) Manager.view.show(ViewID.CopyBuffUnlockView, left, totalTime);
        else Manager.view.hide(ViewID.CopyBuffUnlockView);
    }
}