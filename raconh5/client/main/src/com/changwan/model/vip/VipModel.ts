/**
 * 
 * liangyan
 * create 2017-12-20
*/
class VipModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this._exp = 0;
        this._rewardsStatus = 0;
    }

    private _exp:number=0;
    /**当前额度 */
    public get exp():number {return this._exp;}
    public set exp(value:number)
    {
        if(this._exp == value) return;
        this._exp = value;
        this.dispatchEvent(new VipEvent(VipEvent.EXP_UPDATE));
    }

    private _rewardsStatus:number;
    public set rewardsStaturs(value:number)
    {
        if(this._rewardsStatus == value) return;
        this._rewardsStatus = value;
        this.dispatchEvent(new VipEvent(VipEvent.REWARDS_UPDATE));
    }
    
    /**根据vip等级返回奖励状态 */
    public getRewardsStatus(level:number):number
    {
        if(Manager.model.self.attrInfo.vipLevel < level) return VipRewardsStatus.NOT_REACH;
        let flag = Math.pow(2, level);
        if((this._rewardsStatus & flag) == flag) return VipRewardsStatus.HAS_FETCH;
        else return VipRewardsStatus.UN_FETCH;
    } 

    public get hasCanFatch():boolean
    {
        for(let i:number=0; i<VipLevelCVO.MAX_LEVEL; i++)
        {
            if(this.getRewardsStatus(i) == VipRewardsStatus.UN_FETCH) return true;
        }
        return false;
    }
}