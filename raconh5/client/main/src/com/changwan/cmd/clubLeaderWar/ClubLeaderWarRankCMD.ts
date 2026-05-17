/**
 * 盟主战排名信息
 */
class ClubLeaderWarRankCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_RANK;
    }

    public receive(pi:TCPPacketIn):void
    {
        let info:ClubLeaderWarInfo = Manager.model.getClubLeaderWar().info;
        let len:number = pi.readShort();
        let has:boolean;
        for(let i:number=0; i<len; i++)
        {
            let rankInfo:ClubLeaderWarRankInfo = new ClubLeaderWarRankInfo();
            rankInfo.rank = pi.readShort();
            rankInfo.id = pi.readInt64();
            rankInfo.nickName = pi.readUTF();
            rankInfo.career = pi.readByte();
            rankInfo.winCount = 0;
            rankInfo.rankWinCount = pi.readShort();

            has = false;
            for(let j:number=0; j<info.rankList.length; j++)
            {
                if(info.rankList[j].id == rankInfo.id)
                {
                    has = true;
                    info.rankList[j].rankWinCount = rankInfo.rankWinCount;
                    break;
                }
            }

            if(!has)
                info.rankList.push(rankInfo);
        }
        Manager.model.getClubLeaderWar().updateRank();
    }
}