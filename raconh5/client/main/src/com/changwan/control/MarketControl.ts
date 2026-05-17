/**
 * 
 * pzx
 * create 2018-4-17
 * 市场Control
 * 
*/
class MarketControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_ALL_MARKET, MarketQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_REQ_MARKET, MarketPlayerInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_STUFF_AUCTION, MarketSaleCMD);
        Manager.socket.addCMD(Protocol.CMD_CANCEL_AUCTION, MarketNoSaleCMD);
        Manager.socket.addCMD(Protocol.CMD_REQ_LOG, MarketSalyBuyNoticeCMD);
        Manager.socket.addCMD(Protocol.CMD_BUY_AUCTION, MarketBuyCMD);
    }

  
    public query()
    {
        let cmd:MarketQueryCMD = Manager.socket.getCMD(Protocol.CMD_ALL_MARKET) as MarketQueryCMD;
        cmd.send();
    }
  
    public playerInfo(id:number)
    {
        let cmd:MarketPlayerInfoCMD = Manager.socket.getCMD(Protocol.CMD_REQ_MARKET) as MarketPlayerInfoCMD;
        cmd.id = id;
        cmd.send();
    }
 //上架
    public sale(itemId:number,count:number,price:number)
    {
        let cmd:MarketSaleCMD = Manager.socket.getCMD(Protocol.CMD_STUFF_AUCTION) as MarketSaleCMD;
        cmd.itemId = itemId;
        cmd.count = count;
        cmd.price = price;
        cmd.send();
    }
    public onsale(pos:number)
    {
        let cmd:MarketNoSaleCMD = Manager.socket.getCMD(Protocol.CMD_CANCEL_AUCTION) as MarketNoSaleCMD;
        cmd.pos = pos;
        cmd.send();
    }

    public buy(palyId:number,pos:number,count:number)
    {
        let cmd:MarketBuyCMD = Manager.socket.getCMD(Protocol.CMD_BUY_AUCTION) as MarketBuyCMD;
        cmd.paly_id = palyId;
        cmd.pos = pos;
        cmd.count = count;
        cmd.send();
    }
    public noticeList():void
    {
        let cmd:MarketSalyBuyNoticeCMD = Manager.socket.getCMD(Protocol.CMD_REQ_LOG) as MarketSalyBuyNoticeCMD;
        cmd.send();
    }
}