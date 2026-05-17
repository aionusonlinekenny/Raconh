/**
 * pzx 
 * 冲级好礼
 * 2018.1.25
 */
class LevItemChild extends RechargeActivityItem
{
    private _levItemModel:LevItemModel;

	public constructor() {
		super();
	}
	protected addEvent():void
	{
		this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchRewardHandler,this);
        this._levItemModel.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.checkReward,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL,this.roleUpGradeLevHandler,this);   
	}
	protected removeEvent():void
	{
		this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchRewardHandler,this);
        this._levItemModel.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.checkReward,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL,this.roleUpGradeLevHandler,this);  
	}
    private roleUpGradeLevHandler():void
    {
        this.checkReward();
    }
	protected onTouchRewardHandler(e:egret.TouchEvent):void
    {
        //请求领奖
        let cvo:LevItemCVO = this.data;
        if(cvo.checkReward())
        {
            if(cvo.totalNum>0)
            Manager.control.getcashCow().rewardLevItem(cvo.id);
            else
            FloatTips.addTips(LangCVO.getContent("cashCow8"),Color.RED);
        }
        else
        {
            FloatTips.addTips(LangCVO.getContent("common60"),Color.RED);
        }
       
        
    }
	protected initData():void
    {
        this._levItemModel = Manager.model.getcashCow().levItemModel;
    }

	protected dataChanged():void
    {
        this.checkReward();
		let cvo:LevItemCVO = this.data;
        HtmlUtil.setTextFlow(this._descTxt,cvo.desc());
        let gossArr:GainLossVO[]= GainLossVO.parse(cvo.rewards);
        for(let i:number= 0;i<this._list.length;i++)
        {
            if(gossArr[i])
            {
                this._list[i].setGainLossVO(gossArr[i]);
            }
            else
            {
                this._list[i].clear();
            }
        }
    }
    private checkReward():void
    {
        let cvo:LevItemCVO = this.data;
        this._okBtn.visible = true;
        this._chongzhiImg.visible = true;
        this._ilingquImg.visible = false;
        if(cvo.num == 0)
        {
            this._chongzhiImg.source = "common_label_fetch_png";
            if(cvo.checkReward() && cvo.totalNum>0)
            {
                this._redIcon.visible = true;
                this._okBtn.filters = null;
                this._chongzhiImg.filters = null;
            }
            else
            {
                this._redIcon.visible = false;
                FilterUtil.setGrayFilter(this._okBtn);
                FilterUtil.setGrayFilter(this._chongzhiImg)
            }
        }
        else
        {
            this._okBtn.visible = false;
            this._ilingquImg.visible = true;
            this._redIcon.visible = false;
            this._chongzhiImg.visible = false;
        }
        this._countTxt.text = StringUtils.setParam(LangCVO.getContent("cashCow7"),cvo.totalNum);//剩余{0}份
    }
    public dispose():void
    {
        this._okBtn.filters = null;
        super.dispose();
        this._levItemModel = null;
    }
}