/**
 * pzx 
 * 18.3.16
 * 分享奖励
 *  */
class ShareRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SHARE_REWARD;
    }

    public receive(ip:TCPPacketIn):void
    {
        let status:number = ip.readByte();
        Manager.model.getshare().returnShareReward(status);
    }
}