/**
 * 寻宝
 * pzx 
 * create 18.3.7
* @update devil 2018-04-16
 */
class ArtifactIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.__drawRed,this);
    }

    protected removeEvent():void
    {
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.__drawRed,this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        let cvo:ArtifactLossCVO = ArtifactLossCVO.getCvo(ArtifactType.SENDS_ITEM_TYPE);
		let loss:GainLossVO = new GainLossVO(cvo.loss);
        return loss.isEnough();
    }
}