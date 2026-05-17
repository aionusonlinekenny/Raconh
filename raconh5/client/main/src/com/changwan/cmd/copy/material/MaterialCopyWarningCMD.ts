/**
 * 缥缈录警告提示
 * Simon
 * create 2018.4.17
 */
class MaterialCopyWarningCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_WARNING_TIP;
	}

    public receive(pi:TCPPacketIn):void
    {
        let time:number = pi.readShort();
        Manager.view.show(ViewID.MaterialWarningView, time * 1000);
    }
}