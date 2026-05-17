/**
 * 服饰过期
 * luzh
 * create 2017-12-19
*/
class FashionTimeoutCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FASHION_TIMEOUT;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID'),
                // array('name'=>'valid', 'type'=>'int32', 'desc'=>'有效时间戳'),
        let id:number = pi.readShort();
        let cvo:FashionCVO = FashionCVO.getCVO(id);
        if(cvo) cvo.setTimeAndStar(pi.readInt(), cvo.star);
    }
}