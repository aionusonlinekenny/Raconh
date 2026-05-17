/**
 * 盟主战控制器
 * Simon
 * 2018.2.3
 */
class ClubLeaderWarControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_START_INFO, ClubLeaderWarStartInfoCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_END_INFO, ClubLeaderWarEndInfoCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_RANK, ClubLeaderWarRankCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_MATCH, ClubLeaderWarMatchingCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_PLAY_INFO, ClubLeaderWarPlayInfoCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_BUY_COUNT, ClubLeaderWarBuyCountCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_EXIT, ClubLeaderWarExitCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_DESIGNATE, ClubLeaderWarDesignateCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_LEADER_INFO, ClubLeaderWarLeaderInfoCMD);
         Manager.socket.addCMD(Protocol.CMD_CLUB_LEADER_WAR_WORSHIP, ClubLeaderWarWorshipCMD);
    }

    public query():void
    {
        let cmd:ClubLeaderWarStartInfoCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_START_INFO) as ClubLeaderWarStartInfoCMD;
        cmd.send();
    }

    public rankQuery():void
    {
        let cmd:ClubLeaderWarRankCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_RANK) as ClubLeaderWarRankCMD;
        cmd.send();
    }

    public matchingQuery():void
    {
        let cmd:ClubLeaderWarMatchingCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_MATCH) as ClubLeaderWarMatchingCMD;
        cmd.send();
    }

    public buyQuery():void
    {
        let cmd:ClubLeaderWarBuyCountCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_BUY_COUNT) as ClubLeaderWarBuyCountCMD;
        cmd.send();
    }

    public exitQuery():void
    {
        let cmd:ClubLeaderWarExitCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_EXIT) as ClubLeaderWarExitCMD;
        cmd.send();
    }

    public designateQuery(roleId:number):void
    {
        let canDo:boolean = false;
        let list:Array<ClubMemberInfo> = Manager.model.getClub().clubMemberList;
        for(let i:number=0; i<list.length; i++)
        {
            if(list[i].roleId == Manager.model.self.id)
            {
                if(list[i].type == 1)
                {
                    canDo = true;
                    break;
                }
            }
        }
        if(!canDo)
        {
            FloatTips.addTips(LangCVO.getContent("clubLeaderWar26"), Color.RED);
            return;
        }

        let cmd:ClubLeaderWarDesignateCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_DESIGNATE) as ClubLeaderWarDesignateCMD;
        cmd.roleId = roleId;
        cmd.send();
    }

    public leaderRankQuery():void
    {
        let cmd:ClubLeaderWarLeaderInfoCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_LEADER_INFO) as ClubLeaderWarLeaderInfoCMD;
        cmd.send();
    }

    public worshipQuery(roleId:number):void
    {
        let cmd:ClubLeaderWarWorshipCMD = Manager.socket.getCMD(Protocol.CMD_CLUB_LEADER_WAR_WORSHIP) as ClubLeaderWarWorshipCMD;
        cmd.roleId = roleId;
        cmd.send();
    }
}