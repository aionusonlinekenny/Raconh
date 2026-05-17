/**
 * pzx 
 * 17.12.1
 * 披风升星
 *  */
class CloakUpgradeStarCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLOAK_STAR;
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
        Manager.model.getCloak().upGradeStarCloak(id,star);
    }
}