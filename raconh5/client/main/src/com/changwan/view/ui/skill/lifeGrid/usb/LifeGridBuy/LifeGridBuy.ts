class LifeGridBuy extends UIComponent{
    private _vScroller:BaseVScrollerList;
    private _itemModel:ItemsModel;
    private _model:LifeGridModel;
    private _numTxt:Label;
    private _splerBtn:Button;
    private _lifeGridView:LifeGridView;
    private _rankln:number;
	public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridBuy", "LifeGridBuySkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._vScroller.initBtnListData(LifeGridBuyItem,[],true);
		this._itemModel = Manager.model.getItems();
		this._model = Manager.model.getLifeGrid();
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.self.addEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onFrigUpdateHandler, this);
        this._splerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenHuntHandler,this);
    }

    protected removeEvent():void
    {
         Manager.model.self.removeEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onFrigUpdateHandler, this);
         this._splerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenHuntHandler,this);
        super.removeEvent();
    }
    private onOpenHuntHandler():void
    {
        this._lifeGridView.setTap(3);
    }
    private onFrigUpdateHandler():void
    {
        this._numTxt.text = "" + Manager.model.self.attrInfo.destinyfrig;
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
        this.darwData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.darwData();
	}

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private darwData():void{
        let shopArr:ShopCVO[] = ShopCVO.getShopTypeLists(ShopType.LIFEGRID_TYPE);
        shopArr = ArrayUtil.sortOn(shopArr,["lifeIsyiyou","lifeislock","ample","sort"]);
        this._vScroller.dataProvider(shopArr);
        this._numTxt.text = "" + Manager.model.self.attrInfo.destinyfrig;
    }


    public reuse(value:LifeGridView):void
    {
        super.reuse();
       this._lifeGridView = value;
    }

    public unuse():void
    {
        super.unuse();
       
    }

    public dispose():void
    {
        super.dispose();
        this._vScroller.dispose();
        this._vScroller=null;
        this._itemModel=null;
        this._model=null;
        this._numTxt=null;
        this._splerBtn=null;
        this._lifeGridView=null;
        
    }

}