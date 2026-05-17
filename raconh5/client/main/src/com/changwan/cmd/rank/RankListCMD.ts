/**
 * 排行榜信息
 * luzhihong
 * create 2017-11-03
 */
class RankListCMD extends BaseCMD
{
	/*排行榜类型*/
	public type:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.RANK_LIST;
	}
	
    protected processOut(pkg:TCPPacketOut):void
	{
        // array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
        pkg.writeShort(this.type);
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'rank_type', 'type' => 'int16', 'desc' => '排行榜类型'),
                // array('name' => 'my_pos', 'type' => 'int32', 'desc' => '玩家排名'),
                // array('name' => 'my_value1', 'type' => 'int32', 'desc' => '玩家排行榜值'),
                // array('name' => 'list', 'type' => 'arr', 'desc' => '已膜拜的排行榜类型', 'record' => 'rank_list_cli'
                // 	, 'vars' => array(
                //      array('name' => 'rankPos', 'type' => 'int16', 'desc' => '排名'),
	            //     	array('name' => 'id', 'type' => 'int64', 'desc' => '角色id'),
	            //     	array('name' => 'name', 'type' => 'string', 'desc' => '角色名'),
	            //     	array('name' => 'career', 'type' => 'int8', 'desc' => '职业'),
	            //     	array('name' => 'icon', 'type' => 'int8', 'desc' => '头像'),
	            //     	array('name' => 'value1', 'type' => 'int32', 'desc' => '排行榜值 战力榜：战力  等级榜：等级  宠物榜：宠物战力'),
                //         array('name' => 'extra_info', 'type' => 'arr', 'record' => 'rank_extra_cli', 'desc' => '额外数据（长度0则没数据，否则有数据且长度是1，目前只有第一名有数据）', 'vars' => array(
                //             array('name' => 'fashion', 'type' => 'int16', 'desc' => '时装'),
                //             array('name' => 'weapon', 'type' => 'int16', 'desc' => '武器'),
                //             array('name' => 'cloak', 'type' => 'int16', 'desc' => '披风'),
                            // array('name' => 'pet_skin', 'type' => 'int16', 'desc' => '宠物皮肤id'),
                //         )),
                // 	)
                // ),
        let data:any = {};
        data.type = pi.readShort();
        data.myRank = pi.readInt();
        data.myValue = pi.readInt();

        let info:RankInfo;
        let list:Array<RankInfo> = [];
        let len:number = pi.readShort();
        while(len--)
        {
            info = new RankInfo(data.type, pi);
            list.unshift(info);
        }
        // list.sort();
        
        data.list = list;
        Manager.model.getRank().dispatchEvent(new RankEvent(RankEvent.UPDATE_RANK_LIST, data));
    }
}