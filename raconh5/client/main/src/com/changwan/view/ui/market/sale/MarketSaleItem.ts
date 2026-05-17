/**
 * 市场上架物品
 * pzx
 * create 2018-4-12
 */
class MarketSaleItem extends UIComponent{
	private _nameTxt:Label;
    private _numTxt:Label;
    private _item:BaseGoods;
    private _data:MarketItemInfo;
    private _icon:eui.Image;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("market", "MarketSaleItemSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this.touchEnabled = true;
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        super.removeEvent();
    }
    private onTouchHandler():void
    {
        if(this._data)
        {
            Manager.view.show(ViewID.MarketRecycleTipsView,this._data);
        }
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        let cvo:ItemsCVO = this._data.cvo;
        this._nameTxt.text = cvo.name;
        this._numTxt.text = this._data.price * this._data.quantity + "";
        this._item.baseId = cvo.id;
        if(this._data.quantity>1) this._item.count = this._data.quantity;
        this._icon.visible = true;
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
    }
	
	public clear():void
	{
		this._nameTxt.text = "";
        this._numTxt.text = "";
        this._item.clear();
        this._icon.visible = false;
	}

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._nameTxt,this._numTxt);
        Manager.pool.push(this._item);
        this.removeChild(this._icon);
        this._nameTxt=null;
        this._numTxt=null;
        this._item=null;
        this._data=null;
        this._icon=null;
    }
}