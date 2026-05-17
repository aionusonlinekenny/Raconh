/**
 * 盟主战活动图标
 * Simon
 * create 2018-2-7
*/
class ClubLeaderWarActivityIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected onTouchHandler(e:egret.TouchEvent):void
    {
        if(!this._cvo || !this._cvo.isAllCondSatisfy(true)) return;
        Manager.link.linkStr(this._cvo.viewStr);
    }
}