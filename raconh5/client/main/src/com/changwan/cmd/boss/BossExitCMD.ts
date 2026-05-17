/**
 * BOSS退出协议
 * luzhihong
 * create 2018.1.2
 */
class BossExitCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_EXIT;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readByte();
        Manager.view.hide(ViewID.BossEnemyView);

        let bossStrip:BossBloodStrip2 = Manager.view.getView(ViewID.BossBloodStrip) as BossBloodStrip2;
        if(bossStrip) bossStrip.removeHurtRankView();
    }
}