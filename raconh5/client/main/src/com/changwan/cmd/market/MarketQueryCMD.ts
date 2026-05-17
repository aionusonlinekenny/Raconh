/**
 * pzx 
 * 18.4.17
 * 市场玩家例表查询
 *  */
class MarketQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ALL_MARKET;
    }

    public receive(ip:TCPPacketIn):void
    {
        let arr:MarketPlayNameInfo[] = [];
        let ln:number = ip.readShort();
        for(let i:number = 0 ;i<ln;i++)
        {
            let info:MarketPlayNameInfo = new MarketPlayNameInfo;
            info.play_Id = ip.readInt64();
            info.name = ip.readUTF();
            arr.push(info);
        }
        Manager.model.getmarketModel().queryList(arr);
    }
}