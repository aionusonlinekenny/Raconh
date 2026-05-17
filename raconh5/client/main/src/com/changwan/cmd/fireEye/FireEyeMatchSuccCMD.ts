/**
 * 火眼金睛已匹配到玩家
 * liangyan
 * create 2018-03-26
*/
class FireEyeMatchSuccCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_MATCH_SUCC;
    }

    public receive(pi:TCPPacketIn):void
    {
        (Manager.view.getView(ViewID.ClubLeaderWarMatchingView) as ClubLeaderWarMatchingView).stop();
        Manager.control.getFireEye().askEnemyData();
    }
}