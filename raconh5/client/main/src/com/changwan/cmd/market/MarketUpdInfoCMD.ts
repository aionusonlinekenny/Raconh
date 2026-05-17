/**
 * pzx 
 * 18.4.19
 *　实时刷新
 *  */
class MarketUpdInfoCMD extends BaseCMD{
	public constructor()
    {
        super();
        this._protocol = Protocol.CMD_UPD_MARKET_INFO;
    }


    public receive(ip:TCPPacketIn):void
    {
        let type:number = ip.readByte();//１增加，２删除
        let palyId:number = ip.readInt64();
        let name:string = ip.readUTF();
        Manager.model.getmarketModel().updDateList(type,palyId,name);
    }
}