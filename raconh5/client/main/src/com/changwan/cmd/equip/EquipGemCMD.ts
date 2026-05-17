class EquipGemCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EQUIP_GEM;
    }

    public pos:number;
    public itemList:Array<number>;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.pos);
        pkg.writeShort(this.itemList.length);
        for(let i:number=0; i<this.itemList.length; i++)
        {
            pkg.writeInt(this.itemList[i]);
        }
    }

    public receive(pi:TCPPacketIn):void
    {
        let ret:number = pi.readByte();
        Manager.control.getEquip().equipPanel.setGemBack(ret);
        Manager.model.getEquip().dispatchEvent(new EquipEvent(EquipEvent.GEM_UPDATE_EVENT));
    }
}