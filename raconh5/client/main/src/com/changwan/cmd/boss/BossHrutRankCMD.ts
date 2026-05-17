/**
 * BOSS伤害信息
 * luzhihong
 * create 2018.1.2
 */
class BossHrutRankCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_HURT_RANK;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let list:Array<BossPlayerInfo> = [];
        let info:BossPlayerInfo = new BossPlayerInfo();
        info.rank = pi.readShort();//自己的排名
        info.hurt = pi.readInt64();//自己的伤害值
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
        if(bossStrip) bossStrip.addHurtRankView(list, BossRankView.TYPE_DMG);
        // Manager.model.getBoss().dispatchEvent(new BossEvent(BossEvent.RANK_LIST, list));
    }
}