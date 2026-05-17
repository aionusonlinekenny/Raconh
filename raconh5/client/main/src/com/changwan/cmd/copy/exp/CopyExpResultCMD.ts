/**
 * 经验副本结算协议
 * luzhihong
 * create 2018.1.12
 */
class CopyExpResultCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXP_RESULT;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'id', 'type' => 'int32', 'desc' => '副本ID'),
                // array('name' => 'used_time', 'type' => 'int32', 'desc' => '使用时间'),
                // array('name' => 'kill_cnt', 'type' => 'int16', 'desc' => '已击杀的怪物数量'),
                // array('name' => 'exp', 'type' => 'int32', 'desc' => '已获得的经验数'),
        let id:number = pi.readInt();
        let useTime:number = pi.readInt();
        let kills:number = pi.readShort();
        let exp:number = pi.readInt();
        Manager.view.show(ViewID.CopyExpResultView, useTime, kills, exp);
    }
}