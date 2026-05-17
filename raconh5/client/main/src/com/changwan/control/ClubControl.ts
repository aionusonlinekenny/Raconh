/**
 * 宗门
 * Simon
 * 2017.12.15
 */
class ClubControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CLUB_INFO, ClubInfoCMD);
         Manager.socket.addCMD(Protocol.CLUB_DAILY_UPDATE, ClubDailyUpdateCMD);
         Manager.socket.addCMD(Protocol.CLUB_CHIEF_UPDATE, ClubChiefUpdateCMD);
         Manager.socket.addCMD(Protocol.CLUB_RECOMMEND, ClubRecommendCMD);
         Manager.socket.addCMD(Protocol.CLUB_JOIN, ClubJoinCMD);
         Manager.socket.addCMD(Protocol.CLUB_ALTER, ClubAlterCMD);
         Manager.socket.addCMD(Protocol.CLUB_MEMBERLIST, ClubMemberListCMD);
         Manager.socket.addCMD(Protocol.CLUB_SALARY, ClubSalaryCMD);
         Manager.socket.addCMD(Protocol.CLUB_DONATE, ClubDonateCMD);
         Manager.socket.addCMD(Protocol.CLUB_UPGRADE, ClubCareerUpgradeCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:ClubInfoCMD = Manager.socket.getCMD(Protocol.CLUB_INFO) as ClubInfoCMD;
        cmd.send();
    }

    /**
     * 宗门推荐请求
     */
    public clubRecommendQuery():void
    {
        let cmd:ClubRecommendCMD = Manager.socket.getCMD(Protocol.CLUB_RECOMMEND) as ClubRecommendCMD;
        cmd.send();
    }

    /**
     * 宗门加入申请
     */
    public clubJoin(clubId:number, isRecommend:number):void
    {
        let cmd:ClubJoinCMD = Manager.socket.getCMD(Protocol.CLUB_JOIN) as ClubJoinCMD;
        cmd.clubId = clubId;
        cmd.isRecomment = isRecommend;
        cmd.send();
    }

    /**
     * 修改公告
     */
    public modifyAlter(desc:string):void
    {
        let cmd:ClubAlterCMD = Manager.socket.getCMD(Protocol.CLUB_ALTER) as ClubAlterCMD;
        cmd.desc = desc;
        cmd.send();
    }

    /**
     * 宗门成员列表
     */
    public memberListQuery():void
    {
        let cmd:ClubMemberListCMD = Manager.socket.getCMD(Protocol.CLUB_MEMBERLIST) as ClubMemberListCMD;
        cmd.send();
    }

    /**
     * 领取宗门职位福利
     */
    public clubSalary():void
    {
        let cmd:ClubSalaryCMD = Manager.socket.getCMD(Protocol.CLUB_SALARY) as ClubSalaryCMD;
        cmd.send();
    }

    /**
     * 宗门捐献
     */
    public clubDonate(type:number):void
    {
        let cmd:ClubDonateCMD = Manager.socket.getCMD(Protocol.CLUB_DONATE) as ClubDonateCMD;
        cmd.type = type;
        cmd.send();
    }

    /**
     * 晋升
     */
    public clubCareerUpgrade():void
    {
        let cmd:ClubCareerUpgradeCMD = Manager.socket.getCMD(Protocol.CLUB_UPGRADE) as ClubCareerUpgradeCMD;
        cmd.send();
    }
}