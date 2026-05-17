/**
 * 天天返利Model
 * pzx
 * create 2018-3-14
 */
class DailyRebateModel extends egret.EventDispatcher
{
    /** 当天活动例表 */
    private _list:any;
    /** 今日充值总额 */
    private _money:number=0;

    public query(nomey:number,any:any):void
    {
        // array('name'=>'list', 'type'=>'arr', 'tuple'=>'true', 'desc'=>'领取奖励列表', 'vars'=>array(
        //             array('name'=>'amount', 'type'=>'int16', 'desc'=>'额度'),
        //             array('name'=>'isRewarded', 'type'=>'int8', 'desc'=>'是否已领取奖励 0-否 1-是'),
        //         )),
        this._money=nomey;
        this.updateToDayData();
        this.reward(any);
        if(this._list)
        Manager.model.getLogin().home.switch(HomeView2.DAILY,!this.checkCompleteReward())
    }

    public reward(any:any):void
    {
        if(!this._list) return;
        for(let key in any)
        {
            let cvo:DailyRebateCVO = this._list[key];
            if(cvo)
            {
                cvo.setCharge();
                if(any[key]==1)
                {
                    cvo.setReward();
                }
            }
        }
        this.dispatchEvent(new DailyRebateEvent(DailyRebateEvent.DAILYREBATE_UPDATE));
    }
 /** 今日充值总额 */
    public get money():number
    {
        return this._money;
    }

    /** 刷新今天的活动列表 */
    public updateToDayData():any
    {
        let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        this._list = DailyRebateCVO.getcovs(day);
    }
    public getList():any
    {
        if(!this._list) this.updateToDayData();
        return this._list;
    }
    /** 检测是否有奖励 */
    public checkReward():boolean
    {
        if(!this._list) return;
		for(let key in this._list)
		{
			let cvo:DailyRebateCVO = this._list[key];
            if(cvo.checkReward())
            {
                return true;
            }
			
		}
        return false;
    }
/**检测当天奖励是否已领完 */
    public checkCompleteReward():boolean
    {
        for(let key in this._list)
		{
			let cvo:DailyRebateCVO = this._list[key];
            if(!cvo.isReward)
            {
                return false;
            }
		}
        return true;
    }
    //===========================0点刷新＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    private _endTime:number;
    public drawTime():void
    {
        let second:number = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		let nowDate = cw.DateUtil.getDateBySecs(second);
		let updateData:Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),23,59,59);//取当天0时
		this._endTime = Math.round(updateData.getTime()/1000)+2;
        Manager.render.add(this.countdown, this, 60000);
    }
    private countdown():void
    {
        let second:number = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(second<=0)
		{
			Manager.control.getdailyRebate().query();
			Manager.render.remove(this.countdown, this);
			return;
		}
    }

}