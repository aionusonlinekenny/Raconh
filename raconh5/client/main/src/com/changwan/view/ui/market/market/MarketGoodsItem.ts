/**
 * 市场物品
 * pzx
 * create 2018-4-12
 */
class MarketGoodsItem extends UIComponent{
	private _itemBit:BitmapRemote;
	private _numTxt:Label;
    private _data:MarketItemInfo;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("market", "MarketGoodsItemSkin");
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
        super.removeEvent();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
    }
    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(this._data)
        {
            Manager.view.show(ViewID.MarketBuyTipsView,this._data);
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

    public setData(data:MarketItemInfo):void
    {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void
    {
        let cvo:ItemsCVO = this._data.cvo;
        this._itemBit.load(Manager.path.getIconPath(cvo.imgId));
        this._numTxt.text = this._data.price  + "";
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
    }
	
    public dispose():void
    {
        super.dispose();
        Manager.pool.push(this._itemBit);
        this._numTxt.dispose();
        this. _itemBit=null;
        this. _numTxt=null;
        this. _data=null;
    }
}