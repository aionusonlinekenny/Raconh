/**
 * 已膜拜列表
 * luzhihong
 * create 2017-11-03
 */
class RankWorshipListCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.RANK_WORSHIP_LIST;
	}
	
    public receive(pi:TCPPacketIn):void
    {
		// array('name' => 'worship_list', 'type' => 'arr', 'desc' => '已膜拜的排行榜类型', 'vars' => array(
		// 	array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
		let len:number = pi.readShort();
		let types:Array<number> = [];
		while(len--)
		{
			types.push(pi.readShort());
		}
		Manager.model.getRank().worshipTypes = types;
    }
}