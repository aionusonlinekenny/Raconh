/**
 * 初始化
 * luzh
 * create 2017-12-19
*/
class FashionInitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FASHION_INIT;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID'),
                // array('name'=>'fashion_list','type'=>'arr','tuple'=>'true','record'=>'fashion_info','desc'=>'时装列表','vars'=>array(
                //    array('name'=>'fashion_id','type'=>'int16','desc'=>'时装id'),
                //    array('name'=>'valid','type'=>'int32','desc'=>'到期时间戳'),
                //    array('name'=>'star','type'=>'int8','desc'=>'时装星数'),
                // )),
        Manager.model.getDress().fashionModel.curID = pi.readShort();

        let len:number = pi.readShort();
        while(len--)
        {
            let id:number = pi.readShort();
            let cvo:FashionCVO = FashionCVO.getCVO(id);
            if(cvo) cvo.setTimeAndStar(pi.readInt(), pi.readByte());
        }
    }
}