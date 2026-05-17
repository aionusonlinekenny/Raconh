class EquipOneKeyCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EQUIP_ONEKEY;
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
        // Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
        Manager.model.getItems().dispatchEvent(new ItemsEvent(ItemsEvent.ITEM_UPDATE_EVENT));
        Manager.model.getItems().dispatchEvent(new ItemsEvent(ItemsEvent.EQUIP_UPDATE_EVENT));
    }
}