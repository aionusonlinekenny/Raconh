/**
 * 银币副本冷却时间
 * luzhihong
 * create 2018.1.20
 */
class CopySilverCoolingCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_SILVER_COOLING;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'coin_enter_ts', 'type' => 'int32', 'desc' => '时间戳'),
        Manager.model.getCopy().silverModel.cd = pi.readInt();
    }
}