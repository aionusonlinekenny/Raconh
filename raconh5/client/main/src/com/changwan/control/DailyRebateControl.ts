/**
 * 天天返利
 * pzx
 * create 2018-3-14
 */
class DailyRebateControl extends BaseControl
{

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_DAILYREBATE_QUERY, DailyRebateQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_DAILYREBATE_REWARD, DailyRebateRewardCMD);
    }

    public query():void
    {
        let cmd = Manager.socket.getCMD(Protocol.CMD_DAILYREBATE_QUERY) as DailyRebateQueryCMD;
        cmd.send();
    }
    public reward():void
    {
        let cmd = Manager.socket.getCMD(Protocol.CMD_DAILYREBATE_REWARD) as DailyRebateRewardCMD;
        cmd.send();
    }
}