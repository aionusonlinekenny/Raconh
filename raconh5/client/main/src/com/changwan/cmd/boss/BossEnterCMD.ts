/**
 * BOSS进入协议
 * luzhihong
 * create 2018.1.2
 */
class BossEnterCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_ENTER;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeByte(this.id);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readByte();

        let cvo:BossCVO = BossCVO.getCVO(id);
        if(cvo.pkMode > 0) Manager.view.show(ViewID.BossEnemyView);
    }
}