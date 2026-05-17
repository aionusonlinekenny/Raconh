/**
 * 经验副本信息协议
 * luzhihong
 * create 2018.1.12
 */
class CopyExpInfoCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXP_INFO;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'enter_cnt', 'type' => 'int8', 'desc' => '已挑战次数'),
                // array('name' => 'buy_cnt', 'type' => 'int8', 'desc' => '已购买次数'),
                // array('name' => 'enter_ts', 'type' => 'int32', 'desc' => '下次可进入时间戳(秒)'),
        let enterCount:number = pi.readByte();
        let buyCount:number = pi.readByte();
        let nextTime:number = pi.readInt();
        let scoreID:number = pi.readByte();
        let hardLvl:number = pi.readByte();
        Manager.model.getCopy().setBuyCount(CopyConst.TYPE_EXP, buyCount);
        Manager.model.getCopy().expModel.setInfos(enterCount, nextTime, scoreID, hardLvl);
    }
}