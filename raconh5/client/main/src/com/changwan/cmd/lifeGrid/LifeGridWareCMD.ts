/**
 * pzx 
 * 17.12.27
 * 穿戴;
 *  */
class LifeGridWareCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LIFEGRID_WARE;
    }
    //命格唯一id
    public id:number;
    //'孔位置
    public index:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.index);
        pkg.writeInt(this.id);
    }


    public receive(ip:TCPPacketIn):void
    {
        let pos:number = ip.readByte();
        Manager.model.getLifeGrid().returnWare(pos);
    }
}