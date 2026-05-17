/**
 * 传功活动图标
 * Simon
 * create 2018-1-15
*/
class TrainingActivityIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getTraining().addEventListener(TrainingEvent.INFO_UPDATE, this.onInfoUpdateHandler, this);
    }

    protected removeEvent():void
    {
        Manager.model.getTraining().removeEventListener(TrainingEvent.INFO_UPDATE, this.onInfoUpdateHandler, this);
        super.removeEvent();
    }

    protected onTouchHandler(e:egret.TouchEvent):void
    {
        if (Manager.model.getTraining().info.isPlayed)
        {
            FloatTips.addTips(LangCVO.getContent("training8"), Color.RED);
            return;
        }
        if (Manager.model.getTraining().info.status == DailyActivityCVO.STATE_IN)
        {
            Manager.model.getTraining().isfindPoint = true;
            Manager.walk.moveTo(TrainingCVO.regionInfo.trainingPoint, null, null, MapConst.ID_HOME);
        }
        else
        {
            let info: DailyActivityCVO = DailyActivityCVO.getCVO(ActIconID.TRAINING);
            if(info) 
                FloatTips.addTips(LangCVO.getContent("training1", info.timeDesc), Color.RED);
        }
    }

    protected drawAll():void
    {
        super.drawAll();
        this.onInfoUpdateHandler(null);
    }

    private onInfoUpdateHandler(e?:TrainingEvent):void
    {
        this.setIsInTime(Manager.model.getTraining().info.status == DailyActivityCVO.STATE_IN);
    }
}