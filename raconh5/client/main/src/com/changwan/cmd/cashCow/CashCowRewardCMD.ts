/**
 * pzx 
 * 18.1.18
 * 金蟾领奖
 *  */
class CashCowRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CASHCOW_REWARD;
    }
    public receive(ip:TCPPacketIn):void
    {
        let time:number = ip.readInt();
        ///let coin:number = ip.readInt();
        let draw:number = ip.readByte();
        let current:number = ip.readByte();
        let rewardnum:number = ip.readByte();
        Manager.model.getcashCow().rewardUpdateInfo(time,draw,current,rewardnum);
    }
}