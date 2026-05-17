/**
 * pzx 
 * 18.4.17
 * 下架
 *  */
class MarketNoSaleCMD extends BaseCMD{
	public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CANCEL_AUCTION;
    }
	//拍卖单索引
    public pos:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.pos);
    }


    public receive(ip:TCPPacketIn):void
    {
		let pos:number = ip.readInt();
        Manager.model.getmarketModel().noSaleItem(pos);
    }
}