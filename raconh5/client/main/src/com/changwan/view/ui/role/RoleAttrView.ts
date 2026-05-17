class RoleAttrView extends UIComponent
{
	private _baseView:BasePopUpView;
	private _attrName1:Label;
	private _attrName2:Label;
	private _attrName3:Label;
	private _attrName4:Label;
	private _attrName5:Label;
	private _attrName6:Label;
	private _attrName7:Label;
	private _attrName8:Label;
	private _attrValue1:Label;
	private _attrValue2:Label;
	private _attrValue3:Label;
	private _attrValue4:Label;
	private _attrValue5:Label;
	private _attrValue6:Label;
	private _attrValue7:Label;
	private _attrValue8:Label;

	private _attrAddName1:Label;
	private _attrAddName2:Label;
	private _attrAddName3:Label;
	private _attrAddName4:Label;
	private _attrAddName5:Label;
	private _attrAddName6:Label;
	private _attrAddName7:Label;
	private _attrAddName8:Label;
	private _attrAddName9:Label;
	private _attrAddName10:Label;
	private _attrAddValue1:Label;
	private _attrAddValue2:Label;
	private _attrAddValue3:Label;
	private _attrAddValue4:Label;
	private _attrAddValue5:Label;
	private _attrAddValue6:Label;
	private _attrAddValue7:Label;
	private _attrAddValue8:Label;
	private _attrAddValue9:Label;
	private _attrAddValue10:Label;

	public constructor()
	{
		super();
		
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("role", "RoleAttrViewSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;

		this.onResizeHandler(null);

		this._baseView.diImgVisible = false;
		this._baseView.titleBg.visible = false;
		
		let attrList:Array<number> = [13, 11, 15, 14, 16, 17, 18, 19];
		let addAttrList:Array<number> = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

		for(let i:number=1; i<=10; i++)
		{
			if(i <= 8)
			{
				this["_attrName" + i].text = AttrDescTypeEx.getAttrName(attrList[i - 1]);
				this["_attrValue" + i].text = Manager.model.self.attrInfo.getValue(attrList[i - 1]);
			}
			this["_attrAddName" + i].text = AttrDescTypeEx.getAttrName(addAttrList[i - 1]);
			this["_attrAddValue" + i].text = (Manager.model.self.attrInfo.getValue(addAttrList[i - 1]) / 10) + "%";
		}
	}

	protected addEvent():void
	{
		super.addEvent();

		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.RoleAttrView);
	}

	public show(...args:any[]):void
	{
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		super.dispose();

		for(let i:number=1; i<=10; i++)
		{
			if(i <= 8)
			{
				if(this["_attrName" + i]) this["_attrName" + i].dispose();
				if(this["_attrValue" + i]) this["_attrValue" + i].dispose();
			}
			if(this["_attrAddName" + i]) this["_attrAddName" + i].dispose();
			if(this["_attrAddValue" + i]) this["_attrAddValue" + i].dispose();
		}

		if(this._baseView)
			this._baseView.dispose();
		this._baseView = null;
	}
}