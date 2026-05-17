/**
 * 宗门
 * Simon
 * 2017.12.16
 */
class ClubModel extends egret.EventDispatcher
{
    /**宗门信息 */
    public clubInfo:ClubInfo;
    /**宗门推荐信息 */
    public clubRecommendInfo:Array<ClubRecommendInfo>;
    /**宗门成员信息列表 */
    public clubMemberList:Array<ClubMemberInfo>;
    /**成员总战力 */
    public allFight:number = 0;

    public constructor()
    {
        super();

        this.clubInfo = Manager.pool.create(ClubInfo);
        this.clubRecommendInfo = [];
    }

    /**宗门推荐信息更新 */
    public updateChooseClubInfo(list:Array<ClubRecommendInfo>):void
    {
        this.clubRecommendInfo = list;
        this.dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_RECOMMEND));
    }

    public updateMemberListInfo(list:Array<ClubMemberInfo>):void
    {
        this.clubMemberList = list;
        this.dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST));
    }

    /**是否可以捐献 */
    public checkCanDonate():boolean
    {
		if(!OpenCVO.isOpen(OpenConst.ID_CLUB_CENTER)) return false;
        let ret:boolean = false;
        if(this.clubInfo.donateList)
		{
			let count:number = 0;
			let len:number = this.clubInfo.donateList.length;
			for(let i:number=0; i<len; i++)
			{
				if(this.clubInfo.donateList[i].donateType == 1)
				{
					count = ClubDataCVO.getClubDonateById(1).count - this.clubInfo.donateList[i].count;
				}
			}
			ret = count > 0;
		}
        return ret;
    }

    public checkShowRedIcon():boolean
    {
        return this.checkCanDonate() || this.clubInfo.isGetReward == 0 || Manager.model.getJingMai().checkCoin() || this.checkCanUpgrade();
    }

    public checkCanUpgrade():boolean
    {
		if(!OpenCVO.isOpen(OpenConst.ID_CLUB_CAREER)) return false;
        let ret:boolean = false;
        let careerInfo:ClubDataCVO = ClubDataCVO.getClubCareerById(this.clubInfo.clubCareer);
        if(careerInfo)
		{
            let countCanUpgrade:number = 0;
			let condList:Array<any> = careerInfo.condList;
			for(let i:number=0; i<condList.length; i++)
			{
				if(condList[i].type == GainLossVO.LEVEL)
				{
					if(Manager.model.self.attrInfo.level >= condList[i].num)
						countCanUpgrade += 1;
				}
				else if(condList[i].type == GainLossVO.GUILD_DONATE)
				{
					if(this.clubInfo.hisDonate >= condList[i].num)
						countCanUpgrade += 1;
				}
				else if(condList[i].type == GainLossVO.DIMLY_STAR)
				{
					if(Manager.model.getCopy().towerModel.history >= condList[i].num)
						countCanUpgrade += 1;
				}
				else if(condList[i].type == GainLossVO.PET_LEV)
				{
					if(Manager.model.getPet().pinjie >= condList[i].petPhase && Manager.model.getPet().star >= condList[i].petLevel)
						countCanUpgrade += 1;
				}
				else if(condList[i].type == GainLossVO.EQM_LEV)
				{
					if(Manager.model.getEquip().getTotalStrengthenLevel() >= condList[i].num)
						countCanUpgrade += 1;
				}
				else if(condList[i].type == GainLossVO.STONE_LEV)
				{
					if(Manager.model.getEquip().getTotalGemLevel() >= condList[i].num)
						countCanUpgrade += 1;
				}
				else if(condList[i].type == GainLossVO.EQM_SOUL_LEV)
				{
					if(Manager.model.getEquip().getTotalZhuhuanLevel() >= condList[i].num)
						countCanUpgrade += 1;
				}
				else if(condList[i].type == GainLossVO.MERIDIAN_LEV)
				{
					if(Manager.model.getJingMai().getId(Manager.model.self.id) >= condList[i].num)
						countCanUpgrade += 1;
				}
			}
			ret = countCanUpgrade == condList.length;
		}
        return ret;
    }
}