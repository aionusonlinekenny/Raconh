/**
 * pzx 
 * 18.3.1
 * 境界升级
 *  */
class JuexueAmbitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_JUEXUE_AMBIT;
    }
    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }


    public receive(ip:TCPPacketIn):void
    {
        let i:number = ip.readShort();
        Manager.model.getjuexue().updateAmbitLv(i);
    }
}