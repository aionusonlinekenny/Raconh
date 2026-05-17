/**
 * BOSS信息
 * luzhihong
 * create 2018.1.2
 */
class BossInfosCMD extends BaseCMD
{
    public isOpen:boolean;

	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_INFOS;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeByte(this.isOpen?1:0);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let hasKillUpdate:boolean = false;
        let len:number = pi.readShort();
        while(len--)
        {
            let id:number = pi.readByte();
            let cvo:BossCVO = BossCVO.getCVO(id);
            if(cvo)
            {
                let lastBlood:number = cvo.curBlood;
                cvo.setBossInfo(pi.readInt64(), pi.readInt64(), pi.readInt());
                if(!hasKillUpdate)
                {
                    hasKillUpdate = (lastBlood == 0 && cvo.curBlood > 0) || (lastBlood > 0 && cvo.curBlood == 0);
                }
            }
        }
        //BOSS复活或击杀更新(排序用)
        if(hasKillUpdate) Manager.model.getBoss().dispatchEvent(new BossEvent(BossEvent.KILLED_OR_REVIVE));
    }
}