/**
 * 副本结束时间协议
 * luzhihong
 * create 2017.12.25
 */
class CopyEndTimeCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_END_TIME;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readInt();
        let endTime:number = pi.readInt();

        let cvo:CopyCVO = CopyCVO.getCVO(id);
        if(cvo) cvo.endTime = endTime;
    }
}