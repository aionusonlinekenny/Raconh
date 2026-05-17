/**
 * 使用礼包返回结果
 * 17.12.29
 * pzx
 */
class ItemUseResultWin extends LifeGridHunResultWin{
	private _baseId:number;
	private _model:ItemsModel;
	public constructor() {
		super();
	}
	protected setskinname():void
	{
         this.skinName = Manager.path.getSkinName("Items", "ItemUseResultWinSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this._model  = Manager.model.getItems();
	}
	/** 
	 * @param value 道具baseid
    */
	public show(infos:Array<ItemsModelInfo>,value:number):void
    {
		this._infos = infos;
		this._baseId = value;
        if(this.parent == null)
        {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    }
	protected drawData():void
    {
		var goodsLen:number = this._goodItems.length;
		var infosLen:number = this._infos.length;
		var max:number = goodsLen > infosLen ? goodsLen : infosLen;

		var lineMaxCount:number = 4;//单行最多个数
		var dis:number = 128;//两个的位置差
		var item:LifeGridHunResultItem;
		for(var i:number=0; i<max; i++)
		{
			if(i<infosLen)
			{
				if(i >= goodsLen) 
				{
					item = Manager.pool.create(LifeGridHunResultItem);
					this._currentView.addChild(item);
					this._goodItems.push(item);
				}
				this._goodItems[i].x =  (i%lineMaxCount)*dis;
				this._goodItems[i].y =  Math.floor(i/lineMaxCount)*182;
				this._goodItems[i].setData(this._infos[i]);
			}
			else
			{
				Manager.pool.push(Goods);
			}
		}
		let cvo:ItemsCVO = ItemsCVO.getCvo(this._baseId);
		let count:number = this._model.getCountItemById(this._baseId);
		if(count>0)
		{
			this._group.visible = true;
			this._back.btn.visible = false;
			this._lossTxt0.text = cvo.name + "x" + count;
		}
		else
		{
			this._group.visible = false;
			this._back.btn.visible = true;
		}
    }
	protected addEvent():void
    {
        super.addEvent();

        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._hontTenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._hontTenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }
	protected onClickHandler(e:egret.TouchEvent):void
	{
        let btn = e.target;
		if(btn == this._hontTenBtn)
		{
			let count:number = this._model.getCountItemById(this._baseId);
			if(count>0)
			{
				let info:ItemsModelInfo = this._model.getItemModesInfo(this._baseId);
				Manager.view.show(ViewID.UseItemsTips,info);
			}
		}
		Manager.view.hide(ViewID.ItemUseResultWin);
	}

	protected disposedraw():void
	{
		this._model = null;
		this._baseId = 0;
	}
}