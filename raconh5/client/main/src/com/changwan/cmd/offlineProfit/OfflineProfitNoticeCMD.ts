/**
 *author Anydo
 *create 2017-12-20
 *description 
*/
class OfflineProfitNotice extends BaseCMD
{
    public constructor()
	{
		super();
		this._protocol = Protocol.OFFLINE_PROFIT_NOTICE;
	}

    public receive(pi:TCPPacketIn):void
	{
        let time:number = pi.readShort();
        let exp:number = pi.readInt64();
        let coin:number = pi.readInt64();
        let zbCount:number = pi.readShort();
        let rlCount:number = pi.readShort();
        let qhsCount:number = pi.readShort();

        Manager.view.show(ViewID.OfflineProfitView, time, exp, coin, zbCount, rlCount, qhsCount);
    }
}