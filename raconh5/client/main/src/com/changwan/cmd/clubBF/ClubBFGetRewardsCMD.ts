/**
 * 领取个人积分奖励协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFGetRewardsCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.CLUB_BF_GET_REWARDS;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
                // array('name' => 'score_id', 'type' => 'int16', 'desc' => '个人积分奖励id'),
        pkg.writeShort(this.id);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readShort();
        Manager.model.getClubBF().addGetID(id);
    }
}