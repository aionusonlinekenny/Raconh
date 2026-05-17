/**
 * 活动状态列表 上线的时候发
 * liangyan
 * create 2017-12-26
*/
class ActivityStatusListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ACTIVITY_LIST_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        let id:number;
        let status:number;
        let leftTime:number;
        let cvo:DailyActivityCVO;
        let flag:boolean = false;
        while(count > 0)
        {
            id = pi.readShort();
            status = pi.readByte();
            leftTime = pi.readInt();
            cvo = DailyActivityCVO.getCVO(id);
            if(cvo)
            {
                if(!(status == DailyActivityCVO.STATE_IN && leftTime <= 0))
                {
                    cvo.setTime(status, leftTime);
                    flag = true;
                }
            }
            count--;
        }
        if(flag)Manager.model.getActIcon().dispatchEvent(new ActIconEvent(ActIconEvent.LIST_UPDATE));
    }
}