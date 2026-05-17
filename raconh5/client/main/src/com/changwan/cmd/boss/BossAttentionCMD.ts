/**
 * BOSS关注协议
 * luzhihong
 * create 2018.1.2
 */
class BossAttentionCMD extends BaseCMD
{
    public id:number;
    public isAttention:boolean;

	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_ATTENTION;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeByte(this.id);
        pkg.writeByte(this.isAttention ? 1 : 0);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        var list:Array<number> = [];
        let len:number = pi.readShort();
        while(len--)
        {
            list.push(pi.readByte());
        }
        Manager.model.getBoss().setAttentions(list);
    }
}