/**
 * 活跃控制器
 * luzhihong
 * create 2017-11-22
 */
class ActivityControl extends BaseControl
{


    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.DAILY_GET, DailyGetCMD);
        Manager.socket.addCMD(Protocol.DAILY_SCHEDULE_GET, DailyScheduleGetCMD);
    }

    /*领取日常奖励*/
    public getDailyRewards(id:number):void
    {
        let cmd:DailyGetCMD = Manager.socket.getCMD(Protocol.DAILY_GET) as DailyGetCMD;
        cmd.id = id;
        cmd.send();
    }
    /*领取日常阶段奖励*/
    public getDailySchedule(id:number):void
    {
        let cmd:DailyScheduleGetCMD = Manager.socket.getCMD(Protocol.DAILY_SCHEDULE_GET) as DailyScheduleGetCMD;
        cmd.id = id;
        cmd.send();
    }
}