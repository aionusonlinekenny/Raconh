/**
 * pzx 
 * 17.11.18
 * 经脉查询
 *  */
class JingMaiQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_JINGMAI_QUEYT_INFO;
    }

    public receive(ip:TCPPacketIn):void
    {
        var dic:Dictionary<number,number> = new Dictionary<number,number>();
        let payId:number = ip.readInt64();
        let leve:number = ip.readShort();
        dic.add(payId,leve);
        Manager.model.getJingMai().queryJianmai(dic);
    }
}