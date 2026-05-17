/**
 * 时装升星或增加时效
 * luzh
 * create 2017-12-19
*/
class FashionUpCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FASHION_UP;
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
                // array('name'=>'fashion_id', 'type'=>'int16', 'desc' =>'时装ID'),
                // array('name'=>'valid', 'type'=>'int32', 'desc' =>'到期时间戳'),
                // array('name'=>'star','type'=>'int8','desc'=>'时装星数'),
        let id:number = pi.readShort();
        let cvo:FashionCVO = FashionCVO.getCVO(id);
        if(cvo) cvo.setTimeAndStar(pi.readInt(), pi.readByte());
    }
}