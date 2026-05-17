class EquipSuitUpgradeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SUIT_UPGRADE;
    }

    public pos:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.pos);
    }

    public receive(pi:TCPPacketIn):void
    {
        let status:number = pi.readByte();
        if(status)
        {
            FloatTips.addTips(LangCVO.getContent("equip28"), Color.WHITE);
            Manager.control.getEquip().equipPanel.showCgEffect();
        }
    }
}