/**
 * 盟主战退出挑战
 */
class ClubLeaderWarExitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_EXIT;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().exitArenaHandler();
    }
}