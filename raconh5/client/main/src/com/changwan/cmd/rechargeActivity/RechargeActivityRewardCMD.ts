/**
 * pzx 
 * 17.12.16
 * 充值活动领奖
 *  */
class RechargeActivityRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_RECHARGEACTIVITY_REWARD;
    }
    /**id */
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.id);
    }

    public receive(ip:TCPPacketIn):void
    {
        let id:number = ip.readByte();
        Manager.model.getrechargeActivity().returnReward(id);
    }
}