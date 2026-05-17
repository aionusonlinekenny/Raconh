class EquipSuitSplitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SUIT_SPLIT;
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
            Manager.control.getEquip().suitInfoQuery();
    }
}