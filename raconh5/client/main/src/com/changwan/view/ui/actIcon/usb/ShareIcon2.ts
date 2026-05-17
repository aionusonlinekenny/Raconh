/**
 * 分享图标
 * pzx
 * create 2018-3-１６
*/
class ShareIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getshare().addEventListener(ShareEvent.SHARE_UPDATE,this.__drawRed,this);
    }

    protected removeEvent():void
    {
        Manager.model.getshare().removeEventListener(ShareEvent.SHARE_UPDATE,this.__drawRed,this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        let cvo:ShareCVO = ShareCVO.cvo();
		if(cvo.isReward())
		{
            Manager.model.getLogin().home.updateIcon(ActivityIcon.TOP,this._cvo,true);
			return false;
		}
        return (cvo.status);
    }
}