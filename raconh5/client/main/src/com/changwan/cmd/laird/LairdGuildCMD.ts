class LairdGuildCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_GUILD;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        // pkg.writeByte(this.trainingType);
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<LairdClubMemberInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:LairdClubMemberInfo = new LairdClubMemberInfo();
            info.playerId = pi.readInt64();
            if(info.playerId == Manager.model.self.id) continue;
            info.nickName = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.fight = pi.readInt();
            info.status = pi.readByte();
            info.isSeekHelp = pi.readByte();
            info.catchTime = pi.readInt();
            info.lordName = pi.readUTF();
            list.push(info);
        }
        list.sort(this.sortByFight);
        
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, list));
    }

    private sortByFight(value1:LairdClubMemberInfo, value2:LairdClubMemberInfo):number
    {
        if(value1.fight < value2.fight)
            return 1;
        else if(value1.fight > value2.fight)
            return -1;
        else
            return 0;
    }
}