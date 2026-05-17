class LandlordInteractItem extends UIComponent
{
	private _bg:eui.Group;
	private _role:BitmapRemote;
	private _langan:eui.Group;
	private _kuang:eui.Image;
	public type1:eui.Group;
	public type2:eui.Group;
	private _nickName:Label;
	private _clubName:Label;
	private _freeBtn:Button;
	private _hudongBtn:Button;
	private _yazhaBtn:Button;
	private _timeName:Label;
	private _timeValue:Label;
	private _redIcon1:eui.Image;
	private _redIcon2:eui.Image;
	private _nobody:eui.Image;
	private _getBtn:Button;

	private _bgImg:BitmapRemote;
	private _langanImg:BitmapRemote;

	private _model:LairdModel;
	private _callback:Function;
	private _coolyInfo:CoolyInfo;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractItemSkin");
	}

	protected configUI():void
	{
		super.configUI();

		if(!this._bgImg)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bgImg.x = this._bg.x;
			this._bgImg.y = this._bg.y;
			this.addChildAt(this._bgImg, this.getChildIndex(this._bg));
			this._bgImg.load(Manager.path.getPanelLandlordPath("landlord_interacBg", "jpg"), this._bg.width, this._bg.height);
		}

		if(!this._langanImg)
		{
			this._langanImg = Manager.pool.create(BitmapRemote);
			this._langanImg.x = this._langan.x;
			this._langanImg.y = this._langan.y;
			this.addChildAt(this._langanImg, this.getChildIndex(this._langan));
			this._langanImg.load(Manager.path.getPanelLandlordPath("landlord_langan", "png"), this._langan.width, this._langan.height);
		}
	}

	protected initData():void
	{
		this._model = Manager.model.getLaird();

		this.checkShowRedIcon();
	}

	protected addEvent():void
	{
		super.addEvent();
		this._freeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._hudongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._yazhaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
	}

	protected removeEvent():void
	{
		this._freeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._hudongBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._yazhaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
		super.removeEvent();
	}

	private checkShowRedIcon(e?:LairdEvent):void
	{
		this._redIcon1.visible = this._model.checkInteractIcon();
		this._redIcon2.visible = this._model.checkCanGetExp();
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._freeBtn:
				let cbi:CallBackInfo = Manager.pool.create(CallBackInfo, this.onFreeComplelte, this);
				Manager.tips.showTips(LangCVO.getContent("laird18", this._coolyInfo.name), cbi, true);
				break;
			case this._hudongBtn:
				Manager.view.show(ViewID.LandlordInteractView, this._coolyInfo);
				break;
			case this._yazhaBtn:
				Manager.view.show(ViewID.LandlordPressView, this._coolyInfo);
				break;
			case this._getBtn:
				if(this._callback != null)
					this._callback(2);
				break;
		}
	}

	private onFreeComplelte():void
	{
		Manager.control.getLaird().lairdFree(this._coolyInfo.id);
	}

	public clickBack(value:Function):void
	{
		this._callback = value;
	}

	public updateInfo(coolyInfo:CoolyInfo):void
	{
		this._coolyInfo = coolyInfo;
		if(!this._coolyInfo) return;
		this._nickName.text = "Lv." + coolyInfo.level + " " + coolyInfo.name;
		this._clubName.text = LangCVO.getContent("laird13", coolyInfo.clubName);
		this._role.load(Manager.path.getPanelLandlordPath("landlord_career" + coolyInfo.career, "png"));

		this._timeName.text = LangCVO.getContent("laird16");
		let leftTime:number = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
		if(leftTime <= 0)
		{
			this._timeName.text = LangCVO.getContent("laird17");
			leftTime = this._coolyInfo.freeTimes - ((new Date).getTime() / 1000);
			if(leftTime > 0)
				Manager.render.add(this.timeHandler, this, 1000);
		}
		else
			Manager.render.add(this.timeHandler, this, 1000);
		this._timeValue.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
	}

	private timeHandler():void
	{
		let leftTime:number = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
		if(leftTime < 0)
		{
			leftTime = this._coolyInfo.freeTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
		}
		if(leftTime < 0)
		{
			Manager.render.remove(this.timeHandler, this);
			return;
		}
		this._timeValue.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
	}

	public dispose():void
	{
		Manager.render.remove(this.timeHandler, this);
		super.dispose();
		ObjectUtil.removes(this._bg, this._role, this._langan, this._kuang, this.type1, this.type2, this._nickName, this._clubName, this._freeBtn,
			this._hudongBtn, this._yazhaBtn, this._timeValue, this._nobody, this._getBtn, this._bgImg, this._langanImg);
		this._bg = null;
		this._role = null;
		this._langan = null;
		this._kuang = null;
		this.type1 = null;
		this.type2 = null;
		if(this._nickName)
			this._nickName.dispose();
		this._nickName = null;
		if(this._clubName)
			this._clubName.dispose();
		this._clubName = null;
		if(this._freeBtn)
			this._freeBtn.dispose();
		this._freeBtn = null;
		if(this._hudongBtn)
			this._hudongBtn.dispose();
		this._hudongBtn = null;
		if(this._yazhaBtn)
			this._yazhaBtn.dispose();
		this._yazhaBtn = null;
		if(this._timeValue)
			this._timeValue.dispose();
		this._timeValue = null;
		this._nobody = null;
		if(this._getBtn)
			this._getBtn.dispose();
		this._getBtn = null;
		if(this._bgImg)
			Manager.pool.push(this._bgImg);
		this._bgImg = null;
		if(this._langanImg)
			Manager.pool.push(this._langanImg);
		this._langanImg = null;
		this._model = null;
		this._callback = null;
		this._coolyInfo = null;
	}
}