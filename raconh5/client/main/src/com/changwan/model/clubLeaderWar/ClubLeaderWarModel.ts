/**
 * 盟主战
 * Simon
 * 2018.2.3
 */
class ClubLeaderWarModel extends egret.EventDispatcher
{
    /**活动状态：0结束或未开始，1进行中 */
    public status:number = 0;
    /**活动信息 */
    public info:ClubLeaderWarInfo;

    public constructor()
    {
        super();

        this.info = new ClubLeaderWarInfo;
    }

    public updateInfo(status:number):void
    {
        this.status = status;
        // this.info.rankList.sort(this.sortByWin);
        this.dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE));
    }

    private sortByWin(value1:ClubLeaderWarRankInfo, value2:ClubLeaderWarRankInfo):number
    {
        if(value1.winCount < value2.winCount)
            return 1;
        else if(value1.winCount > value2.winCount)
            return -1;
        else
            return 0;
    }

    public updateRank():void
    {
        // this.info.rankList.sort(this.sortByWin);
        this.dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE));
    }

    public updateLeaderInfo(list:Array<ClubLeaderWarLeaderInfo>):void
    {
        list.sort(this.sortByFight);
        this.dispatchEvent(new ClubLeaderWarEvent(ClubLeaderWarEvent.CLUB_LEADER_WAR_LEADER_INFO, list));
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

    /**判断是否有膜拜次数 */
    public checkCanMobai():boolean
    {
        if(this.status == 1) return false;
        let mobaiCvoInfo:ClubDataCVO = ClubDataCVO.getClubLeaderWarInfo(9);
        if(mobaiCvoInfo)
        {
            if(Number(mobaiCvoInfo.clubLeaderWarInfoValue) - this.info.mobaiCount > 0)
                return true;
        }

        return false;
    }
}