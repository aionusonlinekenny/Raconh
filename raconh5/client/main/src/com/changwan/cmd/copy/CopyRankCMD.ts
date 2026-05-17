/**
 * 主线副本排行协议
 * luzhihong
 * create 2017.12.4
 */
class CopyRankCMD extends BaseCMD
{
    public id:number;//副本ID
    public index:number;//0前三，1全部

	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_RANK;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeInt(this.id);
        pkg.writeByte(this.index);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readInt();//副本ID
        let index:number = pi.readByte();//0前三，1全部
        let len:number = pi.readShort();
        let infos:Array<CopyRankInfo> = [];
        let info:CopyRankInfo;
        for(let i:number=1; i<=len; i++)
        {
            info = new CopyRankInfo();
            info.rank = i;
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.value = pi.readShort();
            info.power = pi.readInt();
            infos.push(info);
        }

        Manager.model.getCopy().dispatchEvent(new CopyEvent(CopyEvent.UPDATE_RANK, [id, index, infos]));
    }
}