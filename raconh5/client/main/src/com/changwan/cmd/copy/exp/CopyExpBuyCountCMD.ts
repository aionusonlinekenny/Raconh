/**
 * 经验副本购买次数协议
 * luzhihong
 * create 2018.1.12
 */
class CopyExpBuyCountCMD extends BaseCMD
{

	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXP_BUY_COUNT;
	}
    
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.type);
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'buy_cnt', 'type' => 'int8', 'desc' => 'vip已购买次数'),
        Manager.model.getCopy().setBuyCount(pi.readShort(), pi.readByte());
    }
}