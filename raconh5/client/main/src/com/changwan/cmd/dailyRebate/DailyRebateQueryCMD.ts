/**
 * pzx 
 * 18.3.14
 * 天天返利查询
 *  */
class DailyRebateQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_DAILYREBATE_QUERY;
    }

    public receive(ip:TCPPacketIn):void
    {
        let money:number = ip.readInt();
        let ln:number = ip.readShort();
        let any:any={};
        while(ln>0)
        {
            ln--;
            let amount:number = ip.readShort();//额度
            let reward:number = ip.readByte();//是否已领取奖励 0-否 1-是'
            any[amount] = reward;
        }
        Manager.model.getdailyRebate().query(money,any);
    }
}