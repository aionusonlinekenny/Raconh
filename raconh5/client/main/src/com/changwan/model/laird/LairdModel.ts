/**
 * 斗地主
 * Simon
 * 2018.1.23
 */
class LairdModel extends egret.EventDispatcher
{
    /**每日抓捕次数 */
    private catchInfo:LairdCVO;
    /**每日解救次数 */
    private rescueInfo:LairdCVO;
    /**每日互动次数 */
    private interactInfo:LairdCVO;
    /**每日求救次数 */
    private seekHelpInfo:LairdCVO;

    /**角色数据 */
    public lairdRoleInfo:LairdInfo;
    /**当前身份 */
    public curStatus:number = 0;
    /**地主数据 */
    public lordInfoList:Array<LordInfo>;
    /**苦力数据 */
    public coolyInfoList:Array<CoolyInfo>;
    /**战斗胜利返回内容 */
    public resultContent:string;

    public lairdView:LandlordView;

    public constructor()
    {
        super();

        this.catchInfo = LairdCVO.getInfo(1);
		this.rescueInfo = LairdCVO.getInfo(2);
		this.interactInfo = LairdCVO.getInfo(3);
        this.seekHelpInfo = LairdCVO.getInfo(4);

        this.lairdRoleInfo = new LairdInfo();
    }

    public updateCoolyInfo(targetId:number, workSec:number):void
    {
        for(let i:number=0; i<this.coolyInfoList.length; i++)
        {
            if(this.coolyInfoList[i].id == targetId)
            {
                this.coolyInfoList[i].pickSec = workSec;
            }
        }
    }

    public updatePlayResult(isWin:boolean):void
    {
        if(isWin)
            this.lairdView.changeItem(1);
    }

    /**是否显示红点提示 */
    public checkRedIcon():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_LAIRD)) return false;
        return this.checkInteractIcon() || this.checkCatchIcon() || this.checkCanGetExp();
    }

    //如果有苦工并且有互动次数时
    public checkInteractIcon():boolean
    {
        let leftTime:number = this.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if(this.curStatus == LairdStatusType.STATUS_LORD && this.interactInfo.value - this.lairdRoleInfo.interactCount > 0 && this.coolyInfoList.length > 0 && leftTime <= 0) return true;
        return false;
    }

    //如果苦工人数未满并且有抓捕次数时
    public checkCatchIcon():boolean
    {
        if((this.curStatus == LairdStatusType.STATUS_FREE || this.curStatus == LairdStatusType.STATUS_LORD) 
            && this.catchInfo.value - this.lairdRoleInfo.catchCount > 0 && this.coolyInfoList.length < 2)
                return true;
        return false;
    }

    /**判断是否有超过1/24经验提取 */
    public checkCanGetExp(playerId:number = 0):boolean
    {
        if(this.coolyInfoList && this.coolyInfoList.length > 0)
        {
            let totalExp:number = 0;
            let totalCanGetExp:number = 0;
            for(let i:number=0; i<this.coolyInfoList.length; i++)
            {
                if(playerId != 0 && playerId != this.coolyInfoList[i].id) continue;
                let exp:number = 0;
                let info:LairdExpInfo = LairdCVO.getExpInfoByLevel(this.coolyInfoList[i].level);
                if(info) exp = info.exp;
                totalExp += Math.floor(( this.coolyInfoList[i].freeTimes - this.coolyInfoList[i].catchTimes) / 60) * exp;
                totalCanGetExp += Math.floor((Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) - this.coolyInfoList[i].catchTimes - this.coolyInfoList[i].pickSec) / 60) * exp;
            }
            if(totalCanGetExp > 0 && totalCanGetExp >= totalExp / 24)
                return true;
        }
        return false;
    }

    /**每日抓捕次数 */
    public get catchCount():number
    {
        return this.catchInfo.value;
    }
}