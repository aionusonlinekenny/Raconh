class ChangeEquipTips extends BaseItemsTips
{
	private _closeBtn:Button;
	private _item:EquipItem;
	private _itemName:Label;
	private _btn:Button;
	private _img:eui.Image;

	private _itemInfo:ItemsModelInfo;
	private _isAddEvent:boolean = false;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("tips", "ChangeEquipTipsSkin");
	}

	public configUI():void
	{
		super.configUI();

		this._img.touchEnabled = false;
	}

	protected initView():void
	{}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("onItemUpdate")) this.onItemUpdate();
	}

	protected addEvent():void
    {
		if(this._isAddEvent) return;
		this._isAddEvent = true;
		super.addEvent();

		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
	}

    protected removeEvent():void
    {
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);

		super.removeEvent();
		this._isAddEvent = false;
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

	private onItemUpdateHandler(e:ItemsEvent):void
	{
		if(e.params == 2)
		{
			this.invalidate("onItemUpdate");
		}
	}

	private onItemUpdate():void
	{
		if(!this._itemInfo)
		{
			this.dispose();
			return
		}

		let info:ItemsModelInfo = Manager.model.getItems().getItemPos(this._itemInfo.pos);
		if(!info) this.dispose();
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._closeBtn:
				this.dispose();
				break;

			case this._btn:
				Manager.control.getItems().moveItems(this._itemInfo.storagetype, ItemsType.EQUIE, this._itemInfo.pos);
				this.dispose();
				break;
		}
	}

	public reuse(...args:any[]):void
	{
        super.reuse(args);

		if(this._isAddEvent == false)
			this.addEvent();
    }

	public unuse():void
	{
		super.unuse();
	}

	public setData(value:ItemsCVO|ItemsModelInfo):void
	{
		if(!value) return;
		super.setData(value);
	}

	protected drawData():void
	{
		this._itemInfo = this._data as ItemsModelInfo;
		if(this._itemInfo.cvo)
		{
			this._item.clear();
			this._item.data = this._itemInfo;
			this._itemName.text = this._itemInfo.cvo.name;
		}
		super.drawData();
	}

	public showByParent(parent:egret.DisplayObjectContainer):void
	{
		parent.addChild(this);
		this.x = (Manager.global.gameMain.stage.$stageWidth - this.width) / 2;
		this.y = (Manager.global.gameMain.stage.$stageHeight - this.height) / 2;
	}

	public dispose():void
	{
		super.dispose();

		Manager.pool.push(Manager.tips.changeEquipTips);
		Manager.tips.changeEquipTips = null;
	}
}