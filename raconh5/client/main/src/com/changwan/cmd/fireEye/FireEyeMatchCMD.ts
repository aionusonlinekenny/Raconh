/**
 * 火眼金睛参与活动（进入匹配队列）
 * liangyan
 * create 2018-03-27
*/
class FireEyeMatchCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_MATCH;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.view.show(ViewID.ClubLeaderWarMatchingView, ClubLeaderWarMatchingView.TYPE_FIRE_EYE);
    }
}