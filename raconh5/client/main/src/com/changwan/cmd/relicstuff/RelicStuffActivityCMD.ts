/**
 * pzx 
 * 18.3.9
 *　神器激活，碎片激活
 *  */
class RelicStuffActivityCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_RELICSTUFF_ACTIVITY;
    }
     /** ('name'=>'type', 'type'=>'int8', 'desc'=>'激活类型 1-碎片 2-神器'), */
    public type:number;
    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
        pkg.writeByte(this.id);
    }

    public receive(ip:TCPPacketIn):void
    {
        let type:number = ip.readByte();
        let id:number = ip.readByte();

        Manager.model.getrelicstuff().setActivity(type,id);
    }
}