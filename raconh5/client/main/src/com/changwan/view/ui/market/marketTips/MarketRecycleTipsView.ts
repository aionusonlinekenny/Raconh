/**
 * pzx 
 * 17.14.16
 * 市场下架iew
 */
class MarketRecycleTipsView extends PopUpView{
	/** 数量*/
	private _numTxt:Label;
	private _buyBtn:Button;
	private _goods:Goods;
	private _nameTxt:Label;
	/** 总价 */
	private _goldTxt:Label;
	//单价
	private _priceTxt:Label;
	private _count:number;
	private _price:number;

	private _data:MarketItemInfo;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("market/tips", "MarketRecycleTipsViewSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this.touchEnabled  = true;
		this._goods.touchEnabled = false;
		this._goods.clear();
		this._nameTxt.stroke = 2;
		this._nameTxt.strokeColor=0x7C6E62;
		this._popupView.titleImg.source = "market_nosale_png";
		this._popupView.bgHeight= 670;
		this._popupView.diImgVisible = false;
		this._popupView.viewY = 300;
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
		this._numTxt.text = this._data.quantity + "";
		this._goldTxt.text = this._data.quantity * this._data.price + "";
		this._priceTxt.text = this._data.price + "";
	}

	protected addEvent():void
	{
		super.addEvent();
		this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
	}

	protected removeEvent():void
	{
		this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		super.removeEvent();
	}
	private onTouchHandler():void
	{
		Manager.control.getmarket().onsale(this._data.pos);
		this.onTouchCloseHandler();
	}

	
	protected onTouchCloseHandler():void
	{
		Manager.view.hide(ViewID.MarketRecycleTipsView);
	}
	public clear():void
	{
		this._goods.clear();
		this._count = 1;
		this._price = 0;
		this._numTxt.text = "";
		this._data = null;
		this._nameTxt.text = "";
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
		ObjectUtil.disposes(this._numTxt,this._buyBtn,this._nameTxt,this._goldTxt,this._priceTxt);
		Manager.pool.push(this._goods);
		this. _numTxt=null;
		this. _buyBtn=null;
		this. _goods=null;
		this. _nameTxt=null;
		this. _goldTxt=null;
		this. _priceTxt=null;
		this. _data=null;
	}
}