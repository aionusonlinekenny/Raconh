/**
 * 商城活动图标
 * pzx
 * create 2018-3-6
*/
class ShopIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getShop().treasureGarretModel.addEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.HONOR,this.__drawRed,this);
    }

    protected removeEvent():void
    {
        Manager.model.getShop().treasureGarretModel.removeEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.HONOR,this.__drawRed,this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        return (Manager.model.getShop().treasureGarretModel.checkfreeTime()|| Manager.model.self.attrInfo.honor>=500);
    }

}