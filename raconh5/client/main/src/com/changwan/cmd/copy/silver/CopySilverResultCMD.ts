/**
 * 银币副本结算
 * luzhihong
 * create 2018.1.20
 */
class CopySilverResultCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_SILVER_RESULT;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'kill_count', 'type' => 'int16', 'desc' => '击杀数量'),
                // array('name' => 'ratio', 'type' => 'int16', 'desc' => '加成'),
                // array('name' => 'coin', 'type' => 'int32', 'desc' => '银币'),
                // array('name' => 'gold', 'type' => 'int32', 'desc' => '元宝'),
        let kills:number = pi.readShort();
        let rate:number = pi.readShort();
        let silver:number = pi.readInt();
        let gold:number = pi.readInt();

        Manager.view.show(ViewID.CopySilverResultView, kills, rate, silver, gold);
    }
}