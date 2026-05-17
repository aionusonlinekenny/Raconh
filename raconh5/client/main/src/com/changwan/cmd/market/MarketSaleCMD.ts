/**
 * pzx 
 * 18.4.17
 * 上架
 *  */
class MarketSaleCMD extends BaseCMD{
	public constructor()
    {
        super();
        this._protocol = Protocol.CMD_STUFF_AUCTION;
    }
	//物品id
    public itemId:number;
	//数量
	public count:number;
	//单价
	public price:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.itemId);
		pkg.writeShort(this.count);
		pkg.writeInt(this.price);
    }


    public receive(ip:TCPPacketIn):void
    {
		Manager.model.getmarketModel().setSaleItem(ip);
    }
}