/**
 * 经验副本数据协议
 * luzhihong
 * create 2018.1.12
 */
class CopyExpDataCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXP_DATA;
	}

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'wheel', 'type' => 'int8', 'desc' => '当前波数'),
                // array('name' => 'inspire', 'type' => 'int16', 'desc' => '鼓舞加成'),
                // array('name' => 'kill_cnt', 'type' => 'int16', 'desc' => '已击杀的怪物数量'),
                // array('name' => 'exp', 'type' => 'int32', 'desc' => '已获得的经验数'),
        Manager.model.getCopy().expModel.initData(pi.readByte(), pi.readShort(), pi.readShort(), pi.readInt());
    }
}