/**
 * pzx 
 * 17.12.1
 * 穿戴
 *  */
class CloakWareCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLOAK_WARE;
    }
/**披风id(0则是卸下) */
    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }


    public receive(ip:TCPPacketIn):void
    {
        let id:number = ip.readShort();
        Manager.model.getCloak().setCurrentId(id);
    }
}