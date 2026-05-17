class EquipZhuhunCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EQUIP_ZHUHUN;
    }

    public pos:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.pos);
    }

    public receive(pi:TCPPacketIn):void
    {
        let ret:number = pi.readByte();
        if(!ret)
        {
            Manager.model.getItems().dispatchEvent(new ItemsEvent(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT));
        }
        else
        {
            Manager.control.getEquip().equipPanel.showCgEffect();
        }
    }
}