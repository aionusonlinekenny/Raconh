/**
 * 活动图标controller
 * liangyan
 * create 2017-12-21
*/
class ActIconControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.ACTIVITY_LIST_UPDATE, ActivityStatusListCMD);
        Manager.socket.addCMD(Protocol.ACTIVITY_UPDATE, ActivityStatusCMD);
        Manager.socket.addCMD(Protocol.ACTIVITY_END, ActivityEndCMD);
    }
}