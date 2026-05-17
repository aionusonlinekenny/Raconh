/**
 * 请求玩家数据协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFPlayerInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_BF_PLAYER_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'score', 'type' => 'int32', 'desc' => '个人积分数'),
                // array('name' => 'guild_rank', 'type' => 'int32', 'desc' => '盟会积分排名'),
                // array('name' => 'score_get_ids', 'type' => 'arr', 'desc' => '已领取的个人积分奖励id', 'vars' => array(
                //     array('name' => 'score_id', 'type' => 'int16', 'desc' => '个人积分奖励id'),
                // )),
        Manager.model.getClubBF().score = pi.readInt();
        pi.readInt();

        let ids:Array<number> = [];
        let len:number = pi.readShort();
        while(len--)
        {
            ids.push(pi.readShort());
        }
        Manager.model.getClubBF().hasGetIDs = ids;
    }
}