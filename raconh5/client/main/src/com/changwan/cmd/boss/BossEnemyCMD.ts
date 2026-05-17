/**
 * BOSS敌对玩家信息
 * luzhihong
 * create 2018.1.2
 */
class BossEnemyCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_ENEMY;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let list:Array<BossPlayerInfo> = [];
        let info:BossPlayerInfo;
        let len:number = pi.readShort();
        while(len--)
        {
            let id:number = pi.readInt64();
            info = Manager.model.getBoss().getEnemyByID(id);
            if(info == null) 
            {
                info = new BossPlayerInfo();
                info.id = id;
            }
            info.name = pi.readUTF();
            info.career = pi.readByte();
            info.power = pi.readInt();
            info.curBlood = pi.readInt64();
            info.totalBlood = pi.readInt64();
            list.push(info);
        }
        Manager.model.getBoss().enemyList = list;
    }
}