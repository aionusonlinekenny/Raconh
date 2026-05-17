/**
 * pzx 
 * 18.3.14
 * 天天反利领奖
 *  */
class DailyRebateRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_DAILYREBATE_REWARD;
    }

    public receive(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        let any:any={};
        while(ln>0)
        {
            ln--;
            let amount:number = ip.readShort();//额度
            let reward:number = ip.readByte();//是否已领取奖励 0-否 1-是'
            any[amount] = reward;
        }
        Manager.model.getdailyRebate().reward(any);
    }
}