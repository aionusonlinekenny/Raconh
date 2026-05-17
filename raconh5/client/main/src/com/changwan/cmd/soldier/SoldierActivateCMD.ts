/**
 * Simon
 * 2017.12.21
 * 激活
 *  */
class SoldierActivateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SHENBING_ACTIVATE;
    }

    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }

    public receive(ip:TCPPacketIn):void
    {
        let id:number = ip.readShort();
        let star:number = ip.readByte();
        Manager.model.getSoldier().activate(id,star);
    }
}