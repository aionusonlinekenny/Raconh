/**
 * 
 * pzx
 * create 2018-1-3
*/
class SysChargeModel extends egret.EventDispatcher
{
    /** 已首充的id */
    private _fristArr:Array<number>;
    /** 首充豪礼是否领奖 真为领 */
    private _isReward:boolean=false;
    public constructor()
    {
        super();
    }
    public returnQuery(arr:Array<number>):void
    {
        this._fristArr = arr;
        this.dispatchEvent(new SysChargeEvent(SysChargeEvent.SYSCHARGE_QUERY_EVENT));
    }
    public get covs():SysChargeCVO[]
    {
        let list:SysChargeCVO[] = SysChargeCVO.cvos();
        if(this._fristArr)
        {
            for(let id of this._fristArr)
            {
                for(let info of list)
                {
                    if(info.id == id)
                    {
                        info.setFirst();
                    }
                }
            }
        }
        return list;
    }
    /** 服务端返回是否领奖*/
    public returnIsReward(value:boolean):void
    {
        this._isReward = value;
        this.dispatchEvent(new FirstChargeEvent(FirstChargeEvent.FIRSTCHARGE_REWARD_EVENT));
        if(value)
        {
            Manager.view.hide(ViewID.FirstChargeView);
        }
    }
    public get isReward():boolean
    {
        return this._isReward;
    }
    
}