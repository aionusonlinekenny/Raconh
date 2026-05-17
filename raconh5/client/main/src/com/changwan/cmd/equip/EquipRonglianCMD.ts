class EquipRonglianCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EQUIP_RONGLIAN;
    }

    public list:Array<ItemsModelInfo>;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.list.length);
        for(let i:number=0; i<this.list.length; i++)
            pkg.writeInt64(this.list[i].id);
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<ItemsModelInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        Manager.model.getItems().dispatchEventWith(ItemsEvent.EQUIP_RONGLIAN_UPDATE_EVENT, false, list);
    }
}