class EquipStrengthenCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EQUIP_STRENGTHEN;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        
    }

    public receive(pi:TCPPacketIn):void
    {

    }
}