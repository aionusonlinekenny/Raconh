/**
 * 盟主战三大盟主信息
 */
class ClubLeaderWarLeaderInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_LEADER_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<ClubLeaderWarLeaderInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:ClubLeaderWarLeaderInfo = new ClubLeaderWarLeaderInfo();
            info.rank = pi.readShort();
            info.roleId = pi.readInt64();
            info.career = pi.readByte();
            info.nickName = pi.readUTF();
            info.fight = pi.readInt();
            list.push(info);
        }
        list.sort(this.sortByFight);
        for(let i:number=0; i<list.length; i++)
        {
            list[i].rank = i + 1;
        }
        Manager.model.getClubLeaderWar().updateLeaderInfo(list);
    }

    private sortByFight(value1:ClubLeaderWarLeaderInfo, value2:ClubLeaderWarLeaderInfo):number
    {
        if(value1.fight < value2.fight)
            return 1;
        else if(value1.fight > value2.fight)
            return -1;
        else
            return 0;
    }
}