/**
 * pzx 
 * 18.1.18
 * 金蟾查询
 *  */
class CashCowQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CASHCOW_QUERY;
    }
    public receive(ip:TCPPacketIn):void
    {
        let time:number = ip.readInt();
        let isActive:number = ip.readByte();
        let draw:number = ip.readByte();
        let current:number = ip.readByte();//领奖次数，不包括免费
        let rewardnum:number = ip.readByte();//实际领免费的次数
        Manager.model.getcashCow().returnCashCowInfo(time,draw,current,isActive,rewardnum);
    }
}