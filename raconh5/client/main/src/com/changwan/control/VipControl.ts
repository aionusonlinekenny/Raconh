/**
 * vip控制器
 * liangyan
 * create 2017-12-20
*/
class VipControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD()
    {
        Manager.socket.addCMD(Protocol.VIP_EXP_UPDATE, VipExpUpdateCMD);
        Manager.socket.addCMD(Protocol.VIP_REWARDS_UPDATE, VipRewardsUpdateCMD);
    }

    /**领取vip等级奖励 */
    public getRewardsByLevel(level:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.VIP_REWARDS_UPDATE) as VipRewardsUpdateCMD;
        cmd.level = level;
        cmd.send();
    }
}