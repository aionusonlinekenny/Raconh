/**
 * 活动结束前10秒倒计时
 * liangyan
 * create 2017-12-26
*/
class ActivityEndCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ACTIVITY_END;
    }

    public receive(pi:TCPPacketIn):void
    {
    }
}