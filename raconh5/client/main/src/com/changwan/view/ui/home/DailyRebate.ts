/**
 * 显示天天返利图标
 * */
class DailyRebate
{
    private _dailyrebateIcon:DailyRebateIcon2;
    private _iconImageLayer:egret.DisplayObjectContainer;
    private _visible:boolean;
    public constructor()
    {   
        this._visible = false;
    }

    public switch(visible:boolean):void
    {
        visible = visible && !Manager.model.getdailyRebate().checkCompleteReward() && Manager.model.getSysCharge().isReward;
        if(this._visible == visible)return;
        this._visible = visible;
        if(!visible)
        {
            if(this._dailyrebateIcon != null)
            {
                this._dailyrebateIcon.dispose();
                this._dailyrebateIcon = null;
            }
            Manager.model.getdailyRebate().drawTime();
        }
        else
        {
            if(!this._dailyrebateIcon)
            {
                let cvo:DailyActivityCVO = DailyActivityCVO.getCVO(ActIconID.DAILYREBATE);
                this._dailyrebateIcon = new DailyRebateIcon2();
                this._dailyrebateIcon.setID(cvo.id);
                this._dailyrebateIcon.move(39,580);
            }
        }
    }
}