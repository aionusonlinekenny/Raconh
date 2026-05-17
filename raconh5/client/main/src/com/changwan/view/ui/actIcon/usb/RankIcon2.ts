/**
 * 排行榜图标
 * Simon
 * create 2018-3-13
* @update devil 2018-04-16
*/
class RankIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getRank().addEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.__drawRed, this);
    }

    protected removeEvent():void
    {
        Manager.model.getRank().removeEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.__drawRed, this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
         return (Manager.model.getRank().checkCanWorship());
    }
}