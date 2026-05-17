/**
 * pzx 
 * 18.4.19
 * 购买
 *  */
class MarketBuyCMD extends BaseCMD{
	public constructor()
    {
        super();
        this._protocol = Protocol.CMD_BUY_AUCTION;
    }
	//拍卖单索引
    public pos:number;
    public paly_id:number;
    public count:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        // /array('name'=>'rid', 'type'=>'int64', 'desc'=>'角色id'),
        //         array('name' => 'sale_index', 'type' => 'int32', 'desc' => '拍卖单索引'),
        //         array('name' => 'num', 'type' => 'int16', 'desc' => '购买数量'),
        pkg.writeInt64(this.paly_id);
        pkg.writeInt(this.pos);
        pkg.writeShort(this.count);
    }


    public receive(ip:TCPPacketIn):void
    {
        //    array('name'=>'rid', 'type'=>'int64', 'desc'=>'角色id'),
        //         array('name' => 'sale_index', 'type' => 'int32', 'desc' => '拍卖单索引'),
		// 		array('name' => 'num', 'type' => 'int16', 'desc' => '剩余数量'),
        let succe:number = ip.readByte();
        if(succe == 0) return;
        let palyId:number = ip.readInt64();
		let pos:number = ip.readInt();
        let count:number = ip.readShort();
        Manager.model.getmarketModel().buyInfo(palyId,pos,count);
    }
}