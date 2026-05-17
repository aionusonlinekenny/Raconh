/**
 * 物品弹窗
 * luzhihong
 * create 2018.3.2
 */
class ItemsPrompt extends UIComponent
{
	private _item:EquipItem;
	private _itemName:Label;
	private _btn:Button;
	private _img:eui.Image;
	private _closeBtn:Button;

	private _itemInfo:ItemsModelInfo;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("tips", "ChangeEquipTipsSkin");
	}

    protected configUI():void
    {
        super.configUI();
        this._img.source = "common_label_use_use_now_png";
        this._item.data = this._itemInfo;
        this._itemName.text = this._itemInfo.cvo.name;
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - 720) / 2);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btn:
                // if(this._itemInfo.cvo.prompt == LinkType.USE_ITEMS+"") Manager.model.getItems().useItems(this._itemInfo, this._itemInfo.quantity);
                // else Manager.link.linkStr(this._itemInfo.cvo.prompt);
                Manager.link.linkStr(this._itemInfo.cvo.prompt);
				break;
		}
        // Manager.view.hide(ViewID.ItemsPrompt);
        Manager.pool.push(this);
	}

    public reuse(item:ItemsModelInfo):void
    {
        this.touchChildren = true;
        this._itemInfo = item;
        if(this.parent == null) 
        {
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        this._itemInfo = null;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._item, this._itemName, this._btn, this._closeBtn);
        ObjectUtil.remove(this._img);
        this._item = null;
        this._itemName = null;
        this._btn = null;
        this._img = null;
        this._closeBtn = null;
        this._itemInfo = null;
    }
}