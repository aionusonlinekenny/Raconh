/**
 * 日常阶段奖励领取与领取列表
 * luzhihong
 * create 2017-11-23
 */
class DailyScheduleGetCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.DAILY_SCHEDULE_GET;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeByte(this.id);
	}
	
    public receive(pi:TCPPacketIn):void
    {
		let count:number = pi.readShort();
        if(count == 0)
        {
            Manager.model.getActivity().cleanDailySchedules();
        }
        else
        {
            while(count--)
            {
                Manager.model.getActivity().setDailySchedule(pi.readByte());
            }
        }
        Manager.model.getActivity().dispatchEvent(new ActivityEvent(ActivityEvent.DAILY_SCHEDULE_UPDATE));
    }
}