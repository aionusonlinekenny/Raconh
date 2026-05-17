/**
 * 膜拜
 * luzhihong
 * create 2017-11-03
 */
class RankWorshipCMD extends BaseCMD
{
	/*排行榜类型*/
	public type:number;
	/*第一名玩家id*/
	public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.RANK_WORSHIP;
	}
	
    protected processOut(pkg:TCPPacketOut):void
	{
		// array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
		// array('name' => 'target_id', 'type' => 'int64', 'desc' => '第一名玩家id'),
        pkg.writeShort(this.type);
        pkg.writeInt64(this.id);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        // array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
		let type:number = pi.readShort();
        Manager.model.getRank().addWorshipType(type);
    }
}