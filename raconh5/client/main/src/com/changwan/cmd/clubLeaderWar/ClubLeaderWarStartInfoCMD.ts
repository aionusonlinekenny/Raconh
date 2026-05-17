/**
 * 盟主战活动进行时信息
 */
class ClubLeaderWarStartInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_START_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let info:ClubLeaderWarInfo = Manager.model.getClubLeaderWar().info;
        info.rank = pi.readShort();
        info.playNum = pi.readShort();
        info.playCountdown = pi.readInt();
        info.mobaiCount = 0;
        info.nextTime = 0;

        // info.rank = 1;
        // info.playNum = 50;
        // info.playCountdown = 0;
        // info.mobaiCount = 3;
        // info.nextTime = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) + 3600 * 24 * 7;

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
        Manager.model.getClubLeaderWar().updateInfo(1);
        // Manager.model.getClubLeaderWar().updateInfo(0);
    }
}