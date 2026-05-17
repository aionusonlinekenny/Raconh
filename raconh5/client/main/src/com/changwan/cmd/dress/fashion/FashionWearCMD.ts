/**
 * 时装穿戴与卸下
 * luzh
 * create 2017-12-19
*/
class FashionWearCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FASHION_WEAR;
    }

    /**时装ID */
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
                // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID')),
        pkg.writeShort(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID')),
        Manager.model.getDress().fashionModel.curID = pi.readShort();
    }
}