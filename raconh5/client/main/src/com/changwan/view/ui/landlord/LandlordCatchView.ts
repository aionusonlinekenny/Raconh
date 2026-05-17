/**
 * 斗地主抓捕
 */
class LandlordCatchView extends UIComponent
{
	private _bg:eui.Group;
	private _catchValue:Label;
	private _enterBtn:Button;
	private _tips:Label;
	private _playerList:BaseVScrollerList;

	private _topParent:ClubLunjiantaiPanel;
	private _thisParent:LandlordView;
	private _bgImg:BitmapRemote;

	private _model:LairdModel;

	public constructor(topParent:ClubLunjiantaiPanel, thisParent:LandlordView)
	{
		super();
		this.touchChildren = true;
		this._topParent = topParent;
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordCatchViewSkin");
	}

	protected configUI():void
	{
		super.configUI();

		this._model = Manager.model.getLaird();

		this._tips.stroke = 2;
		this._tips.strokeColor = 0;

		if(this._bgImg == null)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bg.addChild(this._bgImg);
			this.addChildAt(this._bgImg, this.getChildIndex(this._bg));
			this._bgImg.x = this._bg.x;
			this._bgImg.y = this._bg.y;
			this._bgImg.load(Manager.path.getPanelLandlordPath("landlord_di3", "jpg"));
		}
	}

	protected addEvent():void
	{
		super.addEvent();
		this._model.addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
		this._model.addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.onCatchInfoUpdateHandler, this);
		this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		this._model.removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
		this._model.removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.onCatchInfoUpdateHandler, this);
		this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.removeEvent();
	}

	protected initData():void
	{
		super.initData();

		this.onInfoUpdateHandler();

		Manager.control.getLaird().lairdCatch();
	}

	private onInfoUpdateHandler(e?:LairdEvent):void
	{
		this._catchValue.text = (this._thisParent.catchInfo.value - this._model.lairdRoleInfo.catchCount) + "/" + this._thisParent.catchInfo.value;
	}

	private onCatchInfoUpdateHandler(e?:LairdEvent):void
	{
		let list:Array<LairdCatchInfo> = e.params;
		if(!list || list.length == 0)
		{
			this._enterBtn.visible = this._tips.visible = true;
			this._playerList.visible = false;
		}
		else
		{
			this._enterBtn.visible = this._tips.visible = false;
			this._playerList.visible = true;
			this._playerList.initBtnListData(LandlordMsgItem, list, true);
		}
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._enterBtn:
				if(this._topParent)
					this._topParent.changeMenuItem(0);
				break;
		}
	}

	public reuse(topParent:ClubLunjiantaiPanel, thisParent:LandlordView):void
	{
		super.reuse();

		this._topParent = topParent;
		this._thisParent = thisParent;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._bg, this._catchValue, this._enterBtn, this._tips, this._playerList, this._bgImg);
		this._bg = null;
		if(this._catchValue)
			this._catchValue.dispose();
		this._catchValue = null;
		if(this._enterBtn)
			this._enterBtn.dispose();
		this._enterBtn = null;
		if(this._tips)
			this._tips.dispose();
		this._tips = null;
		if(this._playerList)
			this._playerList.dispose();
		this._playerList = null;
		this._topParent = null;
		this._thisParent = null;
		if(this._bgImg)
			this._bgImg.dispose();
		this._bgImg = null;
	}
}