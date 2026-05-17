class EquipGemUpgradeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EQUIP_GEM_UPGRADE;
    }

    public pos:number;
    public gemPos:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.pos);
        pkg.writeByte(this.gemPos);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getEquip().dispatchEvent(new EquipEvent(EquipEvent.GEM_UPDATE_EVENT));
    }
}