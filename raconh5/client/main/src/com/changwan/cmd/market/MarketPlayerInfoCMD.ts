/**
 * pzx 
 * 18.4.17
 * 市场玩家信息
 *  */
class MarketPlayerInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_REQ_MARKET;
    }

    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.id);
    }


    public receive(ip:TCPPacketIn):void
    {
       let info:MarketPlayerInfo = new MarketPlayerInfo;
       info.play_id = ip.readInt64();
       info.career  = ip.readByte();
       let ln:number = ip.readShort();
       info.itemList = [];
       for(let i:number = 0;i<ln;i++)
       {
           let item:MarketItemInfo = new MarketItemInfo();
           item.pos = ip.readInt();
           item.price = ip.readInt();
           item.base_id = ip.readInt();
           item.bind = ip.readByte()== 1;
           item.quantity = ip.readShort();
           var l:number = ip.readShort();
            for(var j:number= 0;j<l;j++)
            {
                var exarr:ExattrItemsinfo = new ExattrItemsinfo();
                exarr.type = ip.readShort();
                exarr.target = ip.readInt();
                exarr.value = ip.readInt();
                exarr.desc = ip.readUTF();
                item.infoList.push(exarr);
            }
            item.sale_time = ip.readInt();
            info.itemList.push(item);
       }
       Manager.model.getmarketModel().setMarketInfo(info);
    }
}