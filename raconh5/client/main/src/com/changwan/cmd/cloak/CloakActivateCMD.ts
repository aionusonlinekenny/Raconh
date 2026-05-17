/**
 * pzx 
 * 17.11.28
 * 激活
 *  */
class CloakActivateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLOAK_ACTIVATE;
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
        Manager.model.getCloak().activateCloak(id,star);
    }
}