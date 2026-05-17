/**
 * boss活动图标
 * luzh
 * create 2017-2-28
* @update devil 2018-04-15
*/
/**
 * 日常活动图标
 * liangyan
 * create 2017-12-28

*/
class BossIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
		Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.__drawRed, this);
		Manager.model.getBoss().addEventListener(BossEvent.CHALLENGE_TIMES, this.__drawRed, this);
    }

    protected removeEvent():void
    {
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
		Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.__drawRed, this);
		Manager.model.getBoss().removeEventListener(BossEvent.CHALLENGE_TIMES, this.__drawRed, this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        return (Manager.model.getBoss().privateChallenge || OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS) && Manager.model.getBoss().publicChallenge);
    }

}