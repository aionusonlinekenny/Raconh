/**
 * 经验副本击杀数更新协议
 * luzhihong
 * create 2018.1.12
 */
class CopyExpKillsCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXP_KILLS;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'kill_cnt', 'type' => 'int16', 'desc' => '已击杀的怪物数量'),
        Manager.model.getCopy().expModel.kills = pi.readShort();
    }
}