/**
 * 天天返利活动图标
 * pzx
 * create 2018-3-15
*/
class DailyRebateIcon2 extends ActBaseIcon2
{
    public constructor()
    {
        super(Manager.layer.iconImageLayer,Manager.layer.homeImageLayer,Manager.layer.homeLayer);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getdailyRebate().addEventListener(DailyRebateEvent.DAILYREBATE_UPDATE,this.__drawRed,this);
    }

    protected removeEvent():void
    {
        Manager.model.getdailyRebate().removeEventListener(DailyRebateEvent.DAILYREBATE_UPDATE,this.__drawRed,this);
        super.removeEvent();
    }

    protected __drawRed(e:BaseEvent):void
    {
        if(Manager.model.getdailyRebate().checkCompleteReward())
        {
            Manager.model.getLogin().home.switch(HomeView2.DAILY,true);
        }
        else
        {
            this.invalidate("checkRedIcon");
        }
    }

    protected hasRedIcon():boolean
    {
        return Manager.model.getdailyRebate().checkReward();
    }
}