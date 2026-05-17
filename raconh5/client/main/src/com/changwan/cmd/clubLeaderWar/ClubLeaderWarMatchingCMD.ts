/**
 * 盟主战匹配信息
 */
class ClubLeaderWarMatchingCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_MATCH;
    }

    public receive(pi:TCPPacketIn):void
    {
    }
}