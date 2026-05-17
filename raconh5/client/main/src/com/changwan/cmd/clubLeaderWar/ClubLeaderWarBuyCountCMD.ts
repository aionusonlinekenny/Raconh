/**
 * 盟主战购买次数
 */
class ClubLeaderWarBuyCountCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_BUY_COUNT;
    }

    public receive(pi:TCPPacketIn):void
    {
        let info:ClubLeaderWarInfo = Manager.model.getClubLeaderWar().info;
        info.playNum = pi.readByte();
        info.playCountdown = pi.readInt();

        Manager.model.getClubLeaderWar().dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_PLAY_TIME_UPDATE));
    }
}