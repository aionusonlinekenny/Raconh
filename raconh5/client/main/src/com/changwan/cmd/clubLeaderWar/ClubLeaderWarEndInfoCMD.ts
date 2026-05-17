/**
 * 盟主战活动结束信息
 */
class ClubLeaderWarEndInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_END_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let info:ClubLeaderWarInfo = Manager.model.getClubLeaderWar().info;
        info.rank = 0;
        info.playNum = 0;
        info.playCountdown = 0;
        info.mobaiCount = pi.readShort();
        info.nextTime = pi.readInt();
        info.rankList = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let rankInfo:ClubLeaderWarRankInfo = new ClubLeaderWarRankInfo();
            rankInfo.rank = pi.readShort();
            rankInfo.id = pi.readInt64();
            rankInfo.nickName = pi.readUTF();
            rankInfo.career = pi.readByte();
            rankInfo.winCount = pi.readShort();
            info.rankList.push(rankInfo);
        }
        Manager.model.getClubLeaderWar().updateInfo(0);
    }
}