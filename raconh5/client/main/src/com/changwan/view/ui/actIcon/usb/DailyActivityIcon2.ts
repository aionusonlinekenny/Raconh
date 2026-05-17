/**
 * 日常活动图标
 * liangyan
 * create 2017-12-28
* @update devil 2018-04-15
*/
class DailyActivityIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.__drawRed, this);
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_UPDATE, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.__drawRed, this);
    }

    protected removeEvent():void
    {
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.__drawRed, this);
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_UPDATE, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.__drawRed, this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        let towerModel = Manager.model.getCopy().towerModel;
        if(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (towerModel.canSaodang || towerModel.canChallenge())) return true;
        if(ActivityCVO.hasCanget() || ActivityScheduleCVO.hasCanget()) return true;
        return false;
    }
}