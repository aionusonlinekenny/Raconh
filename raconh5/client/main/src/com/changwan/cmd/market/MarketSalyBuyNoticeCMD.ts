/**
 * pzx 
 * 18.4.19
 * 记录
 *  */
class MarketSalyBuyNoticeCMD extends BaseCMD{
	public constructor()
    {
        super();
        this._protocol = Protocol.CMD_REQ_LOG;
    }



    public receive(ip:TCPPacketIn):void
    {
        //  array('name' => 'inc_attr', 'type' => 'arr', 'tuple' => 'true', 'desc' => '成长属性','vars'=> array(
        //                 array('name' => 'trade_type', 'type' => 'int8', 'desc' => '交易类型：1：出售，2：购买'),
		// 				array('name' => 'time', 'type' => 'int32', 'desc' => '交易时间'),
        //                 array('name' => 'item', 'type' => 'int32', 'desc' => '物品基础id'),
		// 				array('name' => 'count', 'type' => 'int16', 'desc' => '物品数量'),
		// 				array('name' => 'price', 'type' => 'int32', 'desc' => '税后交易价格'),
        //             )),
        let arr:Array<MarketSaleBuyNoticeInfo>=[];
        let ln:number = ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let info:MarketSaleBuyNoticeInfo = new MarketSaleBuyNoticeInfo;
            info.type = ip.readByte();
            info.sale_time = ip.readInt();
            info.base_id = ip.readInt();
            info.count = ip.readShort();
            info.price = ip.readInt();
            arr.push(info);
        }
        Manager.model.getmarketModel().noticeList(arr);
    }
}