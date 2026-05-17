/**
 * pzx 
 * 17.14.16
 * 市场购买view
 */
class MarketBuyTipsView extends PopUpView{
	/** 单价 */
	private _priceTxt:Label;
	private _goods:BaseGoods;
	private _nameTxt:Label;
	private _jianBtn:Button;
	private _jiaBtn:Button;
	private _buyBtn:Button;
	private _goldTxt:Label;
	private _inputNumTxt:TextInput;

	private _count:number;
	private _price:number;

	private _data:MarketItemInfo;


	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("market/tips", "MarketBuyTipsViewSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this.touchEnabled  = true;
		this._nameTxt.stroke = 2;
		this._nameTxt.strokeColor=0x7C6E62;
		this._popupView.titleImg.source = "shop_goumai_png";
		this._popupView.bgHeight= 640;
		this._popupView.diImgVisible = false;
		this._popupView.viewY = 300;

		this._inputNumTxt.textDisplay.textAlign = "center";
		this._inputNumTxt.textColor = 0xffffff;
		this._inputNumTxt.maxChars = 4;
		this._inputNumTxt.restrict= "0-9";
	}

	protected drawAll():void
	{
		super.drawAll();
		if(this._data)
		{
			this.updateView();
		}
	}
	protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.updateView();
    }
	
	private updateView():void
	{
		this._goods.baseId = this._data.base_id;
		HtmlUtil.setTextFlow(this._nameTxt,HtmlUtil.addColorTag(this._data.cvo.name,this._data.cvo.colorStr));
		this._goods.count = this._data.quantity;
		this._price = this._data.price;
		this._priceTxt.text = this._price + "";
		this._count = 1;
		this.drawCount();
	}

	protected addEvent():void
	{
		super.addEvent();
		this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._inputNumTxt.addEventListener(eui.UIEvent.CHANGE,this.onCheckInputHander,this);
	}

	protected removeEvent():void
	{
		this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._inputNumTxt.removeEventListener(eui.UIEvent.CHANGE,this.onCheckInputHander,this);
		super.removeEvent();
	}
	//检测文本输入
	private onCheckInputHander():void
	{
		let str:string = this._inputNumTxt.text;
		let num:number = Number(str);
		if(num == 0) 
		{
			num = 1;
			this._inputNumTxt.text = "1";
		}
		if(num>this._data.quantity)
		{
			this._count = this._data.quantity;
			this.drawCount();
		}
		else
		{
			this._count = num;
			this.drawTotalPrice();
		}
	}
//数量
	private drawCount():void
	{
		this._inputNumTxt.text = this._count + "";
		this.drawTotalPrice();
	}
	private drawTotalPrice():void
	{
		this._goldTxt.text = this._count * this._price + "";
	}
	private onclickHandler(e:egret.TouchEvent):void
	{
		switch(e.target)
		{
			case this._jianBtn:
				this._count--;
				if(this._count<1)
				{
					this._count = 1;
				}
				this.drawCount();
				break;
			case this._jiaBtn:
				this._count++;
				if(this._count>this._data.quantity)
				{
					this._count = this._data.quantity;
				}
				this.drawCount();
				break;
			case this._buyBtn:
				this.sendBuy();
				return;
		}
	}
	//购买
	private sendBuy():void
	{
		if(Manager.model.getItems().bagSurplus>1)
		{
			let gold:number = this._price * this._count;
			if(gold<= Manager.model.self.attrInfo.gold)
			{
				//您即将花费{0}元宝购买{1}个{2}
				let str:string = LangCVO.getContent("market4");
				str = StringUtils.setParam(str,gold,this._count,this._data.cvo.name);
				let callkBakc:CallBackInfo = Manager.pool.create(CallBackInfo,this.sendBuyHandler,this);
				Manager.tips.showTips(str,callkBakc,true);
			}
			else
			{
				Manager.tips.showTips(LangCVO.getContent("common33"));//元宝不足
			}
		}
		else
		{
			Manager.tips.showTips(LangCVO.getContent("market3"));//背包已满，请清理后购买！
		}
	}
	private sendBuyHandler():void
	{
		Manager.control.getmarket().buy(Manager.model.getmarketModel().getPlayerMarketInfo().play_id,this._data.pos,this._count);
		this.onTouchCloseHandler();
	}
	
	protected onTouchCloseHandler():void
	{
		Manager.view.hide(ViewID.MarketBuyTipsView);
	}

	public show(info:MarketItemInfo):void
	{
		this._data = info;
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose()
	{
		super.dispose();
		ObjectUtil.disposes(this._inputNumTxt,this._jiaBtn,this._jianBtn,this._buyBtn,this._nameTxt,this._goldTxt,this._priceTxt);
		Manager.pool.push(this._goods);
		this. _buyBtn=null;
		this. _goods=null;
		this. _nameTxt=null;
		this. _goldTxt=null;
		this. _priceTxt=null;
		this. _data=null;
	    this._inputNumTxt=null;
	}
}