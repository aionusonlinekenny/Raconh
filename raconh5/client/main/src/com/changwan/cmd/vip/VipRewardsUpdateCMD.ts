/**
 * vip奖励更新
 * liangyan
 * create 2017-12-25
*/
class VipRewardsUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.VIP_REWARDS_UPDATE;
    }

    public level:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.level);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getVip().rewardsStaturs = pi.readShort();
    }
}