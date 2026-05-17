/**
 * pzx 
 * 充值活动
 * 2018.1.19
 */
class RechargeActivityPanel extends Panel{
	private _view:RechargeActivityView;
	private _bitimg:BitmapRemote;
	private _btnDatas:any[];
	private _model:RechargeActivityModel;

	private _curView:UIComponent;
	public constructor()
    {
        super(false);
    }
    protected configUI():void
    {
        super.configUI();
		this.basePanel.setBottomBackTop(1280);
		if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.x = 5;
			this._bitimg.y = 116;
			this.basePanel.addChildAt(this._bitimg,3);
		}
		
		this._model = Manager.model.getrechargeActivity();
		this._btnDatas = this._model.getTitleTabList();

		if(!Manager.model.getcashCow().levItemModel.checkTotalRaward())
		{
			let levBoo:boolean = Manager.model.getcashCow().levItemModel.checkReward();
			this._btnDatas.push({type:RechargeActivityType.RECHARGEACTIVITY_LEVE_TYPE,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ashCow_chongjili_png", imgClick: "ashCow_chongjili_png",showRedIcon:levBoo});
		}

		//兑换活动
		let boo:boolean = Manager.model.getExchange().checkCoin();
		let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
		let exchangeDay:number = ExchangeCVO.getServerDay();
		if(day > exchangeDay)
			this._btnDatas.push({showRedIcon:boo,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "exchange_icon_png", imgClick: "exchange_icon_png",type:RechargeActivityType.RECHARGEACTIVITY_EXCHANGE_TYPE});
		this._btnDatas.push({showRedIcon:boo,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "starUp_icon_png", imgClick: "starUp_icon_png",type:RechargeActivityType.RECHARGEACTIVITY_XIANSHI_TYPE});
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
    }

    protected addEvent():void
    {
        super.addEvent();
		this._model.addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT,this.onIconShowHandler,this);

		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.onIconShowHandler,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onIconShowHandler,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onIconShowHandler,this);
		Manager.model.getcashCow().levItemModel.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.onIconShowHandler2,this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL,this.onIconShowHandler2,this); 
    }

    protected removeEvent():void
    {
		this._model.removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT,this.onIconShowHandler,this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.onIconShowHandler,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onIconShowHandler,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onIconShowHandler,this);
		Manager.model.getcashCow().levItemModel.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.onIconShowHandler2,this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL,this.onIconShowHandler2,this); 
        super.removeEvent();
    }
	private onIconShowHandler(e:RechargeActivityEvent):void
	{
		let selectedIndex:number = this.basePanel.scrollerList.itemList.selectedIndex;
		let type:number = this._btnDatas[selectedIndex].type;
		let boo:boolean;
		switch(type)
		{
			case 1:
			case 2:
			case 3:
				if(e.type != RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT) return;
				let id:number = e.params;
				let cvo:RechargeActivityCVO = RechargeActivityCVO.getcvo(id);
				let index:number;
				for(let i:number=this._btnDatas.length-1;i>-1;i--)
				{
					let any:any = this._btnDatas[i];
					if(any && any.type == cvo.type)
					{
						index = i;
					}
				}
				boo = this._model.checkReward(cvo.type);
				break;
			case 4:
				boo = Manager.model.getExchange().checkCoin();
				break;
			case 6:

				break;
		}
			let btn:BaseFuncBtn;
			btn = this.setPromptSign(selectedIndex);
			if(btn) btn.setIconShow(boo);
		
	}
	private onIconShowHandler2(e:CashCowEvent):void
	{
		if(Manager.model.getcashCow().levItemModel.checkTotalRaward())
		{
			this.removetTab(RechargeActivityType.RECHARGEACTIVITY_LEVE_TYPE);
			return;
		}
		let index:number;
		for(let i:number=this._btnDatas.length-1;i>-1;i--)
		{
			let any:any = this._btnDatas[i];
			if(any && any.type == RechargeActivityType.RECHARGEACTIVITY_LEVE_TYPE)
			{
				index = i;
				break;
			}
		}
		let btn:BaseFuncBtn;
		btn = this.setPromptSign(index);
		let boo:boolean = Manager.model.getcashCow().levItemModel.checkReward();
		if(btn) btn.setIconShow(boo);
	}
	private removetTab(type:number):void
	{
		for(let i:number = this._btnDatas.length-1;i>-1;i--)
		{
			let info:any = this._btnDatas[i];
			if(info.type == type)
			{
				this._btnDatas.splice(i,1);
			}
		}
		this.basePanel.scrollerList.dataProvider(this._btnDatas);
	}
	private setPromptSign(index:number):BaseFuncBtn
	{
		if(this.basePanel)
		{
			let dis:egret.DisplayObject = this.basePanel.scrollerList.itemList.getElementAt(index);
			return (<BaseFuncBtn>dis);
		}
		return null;
	}

	
	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		if(!this._btnDatas[index]) return;
		if(this._curView)
		{
			this._curView.dispose();
			this._curView = null;
		}
		if(this._view)
		{
			this._view = null;
		}
		let type:number = this._btnDatas[index].type;
		switch(type)
		{
			case 1:
			case 2:
			case 3:
				this._view = new RechargeActivityView();
				this.basePanel.title = "rechargeActivity_title_"+type+"_png";
				this._view.setData(type);
				this._curView = this._view;
				this._bitimg.visible = true;
				this._bitimg.load(Manager.path.getPanelrechargeActivityPath("rechargeActivity_bg"+type));
				break;
			case 4:
				this.basePanel.title = "exchange_title_png";
				this._curView = Manager.pool.create(ExchangeView, this);
				this._bitimg.visible = true;
				this._bitimg.load(Manager.path.getPanelrechargeActivityPath("rechargeActivity_bg"+type));
				break;
			case 5:
				this.basePanel.title = "ashCow_chongjihaoli_png";
				this._curView = new LevItemView();
				this.basePanel.setBottomBackTop(1280);
				this._bitimg.visible = false;
				break;
			case 6:
				this.basePanel.title = "xianshi_title_png";
				this._curView = Manager.pool.create(XianshiView, this);
				this._bitimg.visible = true;
				this._bitimg.load(Manager.path.getPanelrechargeActivityPath("rechargeActivity_bg"+type));
				break;
		}
		if(this._curView && !this._curView.parent) this.addChild(this._curView);
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.RechargeActivityPanel);
				break;
		}
	}
	public dispose():void
    {
		if(this._bitimg)
		{
			this.basePanel.removeChild(this._bitimg);
			Manager.pool.push(this._bitimg);
			this._bitimg= null;
		}
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;
		this._btnDatas= null;
		this._model= null;
    }
}