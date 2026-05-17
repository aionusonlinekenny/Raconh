/**
 * pzx
 * 18.1.20
 * 充值活动model
 */
class RechargeActivityModel extends egret.EventDispatcher
{

    //活动剩余时间列表
    private _timeLists:number[]=[];
    //充值额度例表
    private _moneyLists:Array<Array<number>>=[];
    //<type,list>;
    private _cvoList:Dictionary<number,Array<RechargeActivityCVO>>;

    public quperTypeList(type:number):void
    {
        Manager.control.getRecheargeActivity().query(type);
        // if(this._timeLists[type]==null)
        // {
        //     Manager.control.getRecheargeActivity().query(type);
        //     return;
        // }
        // this.dispatchEvent(new RechargeActivityEvent(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT));
    }

/** type活动类型1：单笔充值 2：今日累充3：累计充值 ，time 活动剩余时间，array:充值额度例表长度为0侧未充值，[any[id]=已领取次数]*/
    public queryList(type:number,time:number,array:number[],any:any):void
    {
        this._timeLists[type] = time;
        this._moneyLists[type] = array;
        RechargeActivityCVO.setListinfo(any);
        RechargeActivityCVO.setmoneyInfo(type,array);
        this.dispatchEvent(new RechargeActivityEvent(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT));
    }
    public returnReward(id:number):void
    {
        RechargeActivityCVO.setCurent(id);
        this.dispatchEvent(new RechargeActivityEvent(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT,id));
    }
    /** 活动剩余时间 */
    public getTime(type:number):number
    {
        if(this._timeLists[type])
        {
            return this._timeLists[type];
        }
        return 0;
    }
    /**充值额度例表 */
    public getMoney(type:number):Array<number>
    {
        if(this._moneyLists[type])
        {
            return this._moneyLists[type];
        }
        return [];
    }
/** 获得活动开放的列表 */
    public getTitleTabList():any[]
    {
        this._cvoList = new Dictionary<number,Array<RechargeActivityCVO>>();
        let btnDatas:any[]=[];
        let boo:boolean;
        if(this.setTitleTob(RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE)>0)
        {
            boo = this.checkReward(RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE);
            btnDatas.push({showRedIcon:boo,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rechargeActivity_bottom_1_png", imgClick: "rechargeActivity_bottom_1_png",type:RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE})
        }
        if(this.setTitleTob(RechargeActivityType.RECHARGEACTIVITY_TODAY_TYPE)>0)
        {
            boo = this.checkReward(RechargeActivityType.RECHARGEACTIVITY_TODAY_TYPE);
            btnDatas.push({showRedIcon:boo,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rechargeActivity_bottom_2_png", imgClick: "rechargeActivity_bottom_2_png",type:RechargeActivityType.RECHARGEACTIVITY_TODAY_TYPE})
        }
        if(this.setTitleTob(RechargeActivityType.RECHARGEACTIVITY_TOTAL_TYPE)>0)
        {
            boo = this.checkReward(RechargeActivityType.RECHARGEACTIVITY_TOTAL_TYPE);
            btnDatas.push({showRedIcon:boo,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rechargeActivity_bottom_3_png", imgClick: "rechargeActivity_bottom_3_png",type:RechargeActivityType.RECHARGEACTIVITY_TOTAL_TYPE})
        }
        return btnDatas;
    }
    private setTitleTob(type:number):number
    {
        let arr:Array<RechargeActivityCVO> = RechargeActivityCVO.getCvos(type);
        if(arr.length>0)
        {
            this._cvoList.add(type,arr);
        }
        return arr.length
    }
    public getCvoList(type:number):Array<RechargeActivityCVO>
    {
        let arr:Array<RechargeActivityCVO> = this._cvoList.get(type);
        return arr;
    }
    /**检测是否有可领奖 true为有 */
    public checkReward(type:number):boolean
    {
        let arr:Array<RechargeActivityCVO> = this._cvoList.get(type);
        if(arr && arr.length > 0)
        {
            for(let cvo of arr)
            {
                if(cvo.num>0)
                {
                    return true;
                }
            }
        }
        return false;
    }

  
}