/**
 * 盟主战膜拜
 */
class ClubLeaderWarWorshipCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_WORSHIP;
    }

    public roleId:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.roleId);
    }
}