/**
 * 活动状态 有改变的时候发
 * liangyan
 * create 2017-12-26
*/
class ActivityStatusCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ACTIVITY_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readShort();//活动id
        let status = pi.readByte();//状态
        let leftTime = pi.readInt();//剩余时间

        let cvo = DailyActivityCVO.getCVO(id);
        if(cvo)
        {
            cvo.setTime(status, leftTime);
            Manager.model.getActIcon().dispatchEvent(new ActIconEvent(ActIconEvent.SINGLE_UPDATE, id));
        }
    }
}