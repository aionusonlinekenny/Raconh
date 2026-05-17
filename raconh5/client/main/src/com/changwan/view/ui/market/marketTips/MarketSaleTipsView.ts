/**
 * pzx 
 * 17.14.16
 * y市场上架view
 */
class MarketSaleTipsView extends PopUpView{

	private _goods:Goods;
	private _nameTxt:Label;

	private _jianBtn:Button;
	private _jiaBtn:Button;
	private _inputNumTxt:TextInput;
	/**推荐 */
	private _recommendTxt:Label;

	private _jianBtn0:Button;
	private _jiaBtn0:Button;
	private _priceTxt:Label;
	/**税 */
	private _taxrateTxt:Label;

	private _buyBtn:Button;
	private _goldTxt:Label;

	/**数量 */
	private _count:number;
	/** 单价 */
	private _price:number;
	/** 陪数 */
	private _multiple:number; 

	private static MAX_MULTIPLE = 50;
	private static MAIN_MULTIPLE = -50;

	private _data:ItemsModelInfo;


	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("market/tips", "MarketSaleTipsViewSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this.touchEnabled  = true;
		this._goods.touchEnabled = false;
		this._goods.clear();
		this._nameTxt.stroke = 2;
		this._nameTxt.strokeColor=0x7C6E62;
		this._popupView.titleImg.source = "market_titel_1_png";
		this._popupView.bgHeight= 695;
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
		HtmlUtil.setTextFlow(this._taxrateTxt,LangCVO.getContent("market2"));//税率：<font color='#38b800'>10%</font>
		this.drawCount();
		this._multiple = 0;
		this.drawPrice();
	}
//设置单价
	private drawPrice()
	{
		let sig:string="";
		let color:string;
		if(this._multiple>=0)
		{
			sig = "+";
			color = Color.GREEN_STR;
		}
		else
		{
			color = Color.RED_STR;
		}
		let str:string =StringUtils.setParam(LangCVO.getContent("market1"),sig + this._multiple + "%",color);//推荐单价<font color='#38b800'>{0}</font>
		HtmlUtil.setTextFlow(this._recommendTxt,str);
		this._price = this._data.cvo.market + Math.round(this._data.cvo.market * this._multiple / 100);
		this._priceTxt.text = this._price + "";
		this.drawTotalPrice();
	}

	protected addEvent():void
	{
		super.addEvent();
		this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._jianBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._inputNumTxt.addEventListener(eui.UIEvent.CHANGE,this.onCheckInputHander,this);
	}

	protected removeEvent():void
	{
		this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._jianBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
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
				this._count ++;
				if(this._count>this._data.quantity)
				{
					this._count = this._data.quantity;
				}
				this.drawCount();
				break;
			case this._jianBtn0:
				this._multiple-=5;
				if(this._multiple < MarketSaleTipsView.MAIN_MULTIPLE)
				{
					this._multiple = MarketSaleTipsView.MAIN_MULTIPLE;
				}
				this.drawPrice();
				break;
			case this._jiaBtn0:
				this._multiple+=5;
				if(this._multiple > MarketSaleTipsView.MAX_MULTIPLE)
				{
					this._multiple = MarketSaleTipsView.MAX_MULTIPLE;
				}
				this.drawPrice();
				break;
			case this._buyBtn:
				this.sendBuy();
				return;
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

	//上架
	private sendBuy():void
	{
		Manager.model.getmarketModel().curSaleItem = this._data;
		Manager.control.getmarket().sale(this._data.id,this._count,this._price);
		this.onTouchCloseHandler();
	}
	protected onTouchCloseHandler():void
	{
		Manager.view.hide(ViewID.MarketSaleTipsView);
	}
	public clear():void
	{
		this._goods.clear();
		this._count = 1;
		this._price = 1;
		this.drawPrice();
		this._nameTxt.text = "";
	}

	public show(info:ItemsModelInfo):void
	{
		this._data = info;
		this._count = 1;
		this._price = 1;
		this.invalidate(InvalidationType.DATA);
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose()
	{
		super.dispose();
		ObjectUtil.disposes(this._goods,this._nameTxt,this._jiaBtn,this._jianBtn,this._jiaBtn0,this._jianBtn0,
		this._inputNumTxt,this._recommendTxt,this._priceTxt,this._taxrateTxt,this._buyBtn,this._goldTxt);
		this. _goods=null;
		this. _nameTxt=null;
		this. _jianBtn=null;
		this. _jiaBtn=null;
		this. _inputNumTxt=null;
		this. _recommendTxt=null;
		this. _jianBtn0=null;
		this. _jiaBtn0=null;
		this. _priceTxt=null;
		this. _taxrateTxt=null;
		this. _buyBtn=null;
		this. _goldTxt=null;
		this. _data=null;
	}
}