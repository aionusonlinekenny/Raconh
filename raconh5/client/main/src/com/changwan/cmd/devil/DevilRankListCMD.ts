/**
 * 魔神降临请求排名列表(跟20407字段一样)
 * liangyan
 * create 2018-04-10
*/
class DevilRankListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_RANK_LIST;
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<BossPlayerInfo> = [];
        let info:BossPlayerInfo = new BossPlayerInfo();
        info.rank = pi.readShort();//自己的排名
        info.hurt = pi.readInt64();//自己的积分
        list.push(info);

        let len:number = pi.readShort();
        for(let i:number=1; i<=len; i++)
        {
            info = new BossPlayerInfo();
            info.rank = i;
            info.name = pi.readUTF();
            info.hurt = pi.readInt64();
            list.push(info);
        }
        let bossStrip:BossBloodStrip2 = Manager.view.getView(ViewID.BossBloodStrip) as BossBloodStrip2;
        if(bossStrip) bossStrip.addHurtRankView(list, BossRankView.TYPE_SCORE);
    }
}