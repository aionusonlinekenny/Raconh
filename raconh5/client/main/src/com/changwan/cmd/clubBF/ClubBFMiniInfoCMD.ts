/**
 * 战场内数据协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFMiniInfoCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.CLUB_BF_MINI_INFO;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'boss_hp', 'type' => 'int32', 'desc' => 'boss当前血量'),
                // array('name' => 'boss_max_hp', 'type' => 'int32', 'desc' => 'boss最大血量'),
                // array('name'=> 'score', 'type' => 'int32', 'desc' => '个人积分数'),
                // array('name' => 'guild_rank', 'type' => 'int32', 'desc' => '盟会积分排名'),
                // array('name' => 'atk_cnt', 'type' => 'int32', 'desc' => '进攻人数'),
                // array('name' => 'def_cnt', 'type' => 'int32', 'desc' => '防守人数'),
                // array('name' => 'guild_score_list', 'type' => 'arr', 'desc' => '盟会积分', 'vars' => array(
                //     array('name' => 'gtype', 'type' => 'int8', 'desc' => '盟会类型'),
                //     array('name' => 'score', 'type' => 'int32', 'desc' => '盟会积分'),
                // )),
        let data:Object = {};
        data["bossHP"] = pi.readInt64();
        data["bossMaxHP"] = pi.readInt64();
        data["score"] = pi.readInt();
        data["rank"] = pi.readInt();
        data["atkCount"] = pi.readInt();
        data["defCount"] = pi.readInt();

        let clubScores:Object = {};
        let len:number = pi.readShort();
        while(len--)
        {
            clubScores[pi.readByte()] = pi.readInt();
        }
        data["clubScores"] = clubScores;
        
        Manager.model.getClubBF().score = data["score"];
        Manager.model.getClubBF().dispatchEvent(new ClubBFEvent(ClubBFEvent.MINI_INFOS, data))
    }
}