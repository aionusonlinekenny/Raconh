class SuitDisassemblyTips extends UIComponent
{
	private _baseView:BasePopUpView;
	private _item:BaseGoods;
	private _okBtn:Button;
	private _cancelBtn:Button;

	private _pos:number;

	public constructor()
	{
		super();

		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("equip", "SuitDisassemblyTipsSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;

		this._baseView.titleImg.source = "tips_title_png";

		this.onResizeHandler(null);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._baseView.closeBtn:
			case this._cancelBtn:
				Manager.view.hide(ViewID.SuitDisassemblyTips);
			break;

			case this._okBtn:
				Manager.control.getEquip().suitSplit(this._pos);
				Manager.view.hide(ViewID.SuitDisassemblyTips);
			break;
		}
	}

	public show(pos:number, level:number):void
	{
		this._pos = pos;
		Manager.layer.tipsLayer.addChild(this);

		let num:number = 0;
		for(let i:number=level; i>=1; i--)
		{
			let info:SuitUpgradeCVO = SuitCVO.getSuitUpgradeInfo(i, pos);
			if(info)
			{
				this._item.baseId = info.loss.baseId;
				this._item.bind = info.loss.bind;
				num += info.loss.num;
			}
		}
		this._item.count = num;
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		super.dispose();

		if(this._baseView)
			this._baseView.dispose();
		this._baseView = null;

		if(this._item)
			this._item.dispose();
		this._item = null;

		if(this._okBtn)
			this._okBtn.dispose();
		this._okBtn = null;

		if(this._cancelBtn)
			this._cancelBtn.dispose();
		this._cancelBtn = null;
	}
}