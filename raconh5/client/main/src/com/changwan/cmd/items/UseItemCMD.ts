//使用背包物品
class UseItemCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_USE_ITEM;
    }

    public id:number;
    public count:number;//数量
    public base_id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.id);
        pkg.writeShort(this.count);
        pkg.writeInt(this.base_id);
    }

    public receive(pi:TCPPacketIn):void
    {
        let useId:number = pi.readInt();
        let ln:number = pi.readShort();
        let arr:ItemsModelInfo[] =[];
        for(let i:number= 0 ;i<ln;i++)
        {
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte()==1;
            info.quantity = pi.readInt();
            var l:number = pi.readShort();
            for(var j:number= 0;j<l;j++)
            {
                var exarr:ExattrItemsinfo = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                info.infoList.push(exarr);
            }
            arr.push(info);
        }
        Manager.model.getItems().sueItemResultReturn(useId,arr);
        

    }
}