/**
 * 银币副本小面板信息
 * luzhihong
 * create 2018.1.20
 */
class CopySilverMiniCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_SILVER_MINI;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'ratio', 'type' => 'int16', 'desc' => '加成'),
                // array('name' => 'coin', 'type' => 'int32', 'desc' => '银币'),
                // array('name' => 'gold', 'type' => 'int32', 'desc' => '元宝'),
        let obj:Object = {};
        // obj["kills"] = pi.readShort();
        obj["rate"] = pi.readShort();
        obj["silver"] = pi.readInt();
        obj["gold"] = pi.readInt();
        Manager.model.getCopy().silverModel.dispatchEvent(new CopyEvent(CopyEvent.SILVER_MINI, obj));
    }
}