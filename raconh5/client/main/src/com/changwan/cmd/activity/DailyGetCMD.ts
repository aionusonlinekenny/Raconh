/**
 * 日常奖励领取与领取列表信息
 * luzhihong
 * create 2017-11-23
 */
class DailyGetCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.DAILY_GET;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeByte(this.id);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getActivity().curDailyValue = pi.readInt();
		let count:number = pi.readShort();
        if(count == 0)
        {
            Manager.model.getActivity().cleanDailyStates();
        }
		else
		{
            while(count--)
            {
                let id:number = pi.readByte();
                let count:number = pi.readInt();
                let hasGet:boolean = pi.readByte() != 0;
                Manager.model.getActivity().setDailyState(id, count, hasGet);
            }
		}

        Manager.model.getActivity().dispatchEvent(new ActivityEvent(ActivityEvent.DAILY_UPDATE));
    }
}