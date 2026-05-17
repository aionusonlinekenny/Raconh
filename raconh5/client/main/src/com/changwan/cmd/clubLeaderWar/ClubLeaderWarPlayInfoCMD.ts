/**
 * 盟主战对手信息
 */
class ClubLeaderWarPlayInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_PLAY_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().playType = 2;
        Manager.model.getArena().updatePKData(pi, true);
    }
}