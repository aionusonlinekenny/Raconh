/**
 * 宗主数据更新
 */
class ClubMemberListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_MEMBERLIST;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<ClubMemberInfo> = [];
        let len:number = pi.readShort() + 1;
        let allFight:number = 0;
        for(let i:number=0; i<len; i++)
        {
            let clubMemberInfo:ClubMemberInfo = Manager.pool.create(ClubMemberInfo);
            clubMemberInfo.roleId = pi.readInt64();
            clubMemberInfo.nickName = pi.readUTF();
            clubMemberInfo.turnLife = pi.readByte();
            clubMemberInfo.level = pi.readShort();
            clubMemberInfo.sex = pi.readByte();
            clubMemberInfo.fighting = pi.readInt();
            clubMemberInfo.vip = pi.readByte();
            clubMemberInfo.type = pi.readByte();
            clubMemberInfo.clubCareer = pi.readShort();
            clubMemberInfo.hisDonate = pi.readInt64();
            clubMemberInfo.icon = pi.readByte();
            list.push(clubMemberInfo);
            if(i < len - 1)
                allFight += clubMemberInfo.fighting;
        }
        Manager.model.getClub().allFight = allFight;
        Manager.model.getClub().updateMemberListInfo(list);
    }
}