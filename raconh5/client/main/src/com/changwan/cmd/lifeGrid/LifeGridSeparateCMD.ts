/**
 * pzx 
 * 17.12.27
 * 命格分解
 *  */
class LifeGridSeparateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LIFEGRID_SEPARATE;
    }
    //命格唯一id列表
    public array:number[];
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.array.length);
        for(let i:number = 0;i<this.array.length;i++)
        {
            pkg.writeInt(this.array[i]);
        }
    }

    public receive(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        let arr:ItemsModelInfo[] =[];
        for(let i:number = 0;i<ln;i++)
        {
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = ip.readInt();
            info.bind = ip.readByte()==1;
            info.quantity = ip.readInt();
            arr.push(info);
        }
        Manager.model.getLifeGrid().returnSeparate(arr);

    }
}