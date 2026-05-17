/**
 * 清除挑战cd协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFBuyBuffCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.CLUB_BF_BUY_BUFF;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'res', 'type' => 'int8', 'desc' => '结果，0失败，1成功，2其他人已购买'),
        let state:number = pi.readByte();
        Manager.model.getClubBF().clubBFHasBuy = state != 0;
    }
}