/**
 * Simon
 * 2017.12.21
 * 穿戴
 *  */
class SoldierPutonCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SHENBING_PUTON;
    }

    /**兵魂id(0则是卸下) */
    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }

    public receive(ip:TCPPacketIn):void
    {
        let id:number = ip.readShort();
        Manager.model.getSoldier().currentId = id;
    }
}