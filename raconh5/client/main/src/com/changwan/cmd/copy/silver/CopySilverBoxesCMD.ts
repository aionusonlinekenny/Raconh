/**
 * 银币副本宝箱
 * luzhihong
 * create 2018.1.20
 */
class CopySilverBoxesCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_SILVER_BOXES;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        
        let boxes:Object = {};
        let len:number = pi.readShort();
        while(len--)
        {
            boxes[pi.readByte()] = {id:pi.readInt64(), pos:new egret.Point(pi.readInt(), pi.readInt()), time:pi.readInt(), total:pi.readShort()};//序号、id、恢复时间戳、总冷却时间
        }
        Manager.model.getCopy().silverModel.boxesData = boxes;
        Manager.model.getCopy().silverModel.dispatchEvent(new CopyEvent(CopyEvent.SILVER_BOXES, boxes));
    }
}