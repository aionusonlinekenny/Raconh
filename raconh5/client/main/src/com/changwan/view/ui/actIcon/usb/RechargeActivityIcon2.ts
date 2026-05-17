/**
 * 充值活动图标
 * pzx
 * create 2018-４-１１
*/
class RechargeActivityIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getrechargeActivity().addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.getrechargeActivity().addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT,this.__drawRed,this)
        GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        //兑换活动
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.__drawRed,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.__drawRed,this);

        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL,this.__drawRed,this); 
		Manager.model.getcashCow().levItemModel.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.getcashCow().levItemModel.addEventListener(CashCowEvent.LEVITEM_QUERY_EVENT,this.__drawRed,this);
    }

    protected removeEvent():void
    {
        Manager.model.getrechargeActivity().removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.getrechargeActivity().removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT,this.__drawRed,this)
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        //兑换活动
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.__drawRed,this);
        Manager.model.self. removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.__drawRed,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL,this.__drawRed,this); 
		Manager.model.getcashCow().levItemModel.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.getcashCow().levItemModel.removeEventListener(CashCowEvent.LEVITEM_QUERY_EVENT,this.__drawRed,this);
        super.removeEvent();
    }

    private CrossDayHandler():void
    {
        let any:any[] = Manager.model.getrechargeActivity().getTitleTabList();
        if(any.length == 0)
        {
            Manager.model.getActIcon().removeID(this._cvo.id);
        }
    }

    protected hasRedIcon():boolean
    {
        let any:any[] = Manager.model.getrechargeActivity().getTitleTabList();
        let boo:boolean = false;
        for(let key in any)
        {
            let obj = any[key];
            if(obj.showRedIcon)
            {
                boo = true;
                break;
            }
        }
        boo = boo||Manager.model.getcashCow().levItemModel.checkReward()||Manager.model.getExchange().checkCoin();

        return boo;
    }
}