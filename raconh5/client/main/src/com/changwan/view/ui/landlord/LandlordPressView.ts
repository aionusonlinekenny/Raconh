/**
 * 压榨界面
 */
class LandlordPressView extends UIComponent
{
	private _base:BasePopUpView;
	private _nickName:Label;
	private _level:Label;
	private _workTime:Label;
	private _exp:Label;
	private _todayWorkTime:Label;
	// private _btn1:Button;
	private _btn2:Button;
	// private _gold:Label;
	// private _done:Label;

	private _model:LairdModel;
	private _info:CoolyInfo;
	private _workLeftTime:number;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordPressViewSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;
		this._base.titleImg.source = "landlord_titleyazha_png";
		this.onResizeHandler();

		this._model = Manager.model.getLaird();
	}

	protected initData():void
	{
		this._nickName.text = this._info.name;
		this._level.text = "Lv." + this._info.level;

		let totalWorkTime:number;
		if(this._info.isPickAll == 1)
			totalWorkTime = this._info.pickSec;
		else
			totalWorkTime = Math.floor(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) - this._info.catchTimes;
		this._workLeftTime = totalWorkTime;
		Manager.render.add(this.timeHandler, this, 1000);
		this._workTime.text = cw.DateUtil.formatStr(this._workLeftTime, cw.DateUtil.LEFT_HH_MM_SS, true);

		let awardInfo:LairdAwardInfo = LairdCVO.getAward(3);
		// this._gold.text = String(Math.ceil((this._info.freeTimes - this._info.catchTimes - this._info.pickSec) / 3600) * awardInfo.award.num);

		let exp:number = 0;
		let info:LairdExpInfo = LairdCVO.getExpInfoByLevel(this._info.level);
		if(info) exp = info.exp;
		if(this._info.isPickAll == 1 || (this._info.catchTimes + this._info.pickSec >= this._info.freeTimes))
		{
			// this._exp.text = StringUtils.getBigNum(exp * Math.floor(this._info.pickSec / 60));
			this._exp.text = "0";
		}
		else
			this._exp.text = StringUtils.getBigNum(exp * Math.floor((this._workLeftTime - this._info.pickSec) / 60));

		let totalTime:number = this._info.freeTimes - this._info.catchTimes;
		this._todayWorkTime.text = StringUtils.getBigNum(Math.floor(this._info.pickSec / 60) * exp) + "/" + StringUtils.getBigNum(Math.floor(totalTime / 60) * exp);

		// this._done.visible = (this._info.catchTimes + this._info.pickSec >= this._info.freeTimes);
		// this._done.x = this._exp.x + 80;
	}

	private timeHandler():void
	{
		let totalWorkTime:number;
		if(this._info.isPickAll == 1)
		{
			// totalWorkTime = this._info.pickSec - this._info.catchTimes;
			totalWorkTime = this._info.pickSec;
		}
		else
			totalWorkTime = Math.floor(Manager.model.getLogin().serverTimeInfo.serverTime / 1000) - this._info.catchTimes;
		// this._workLeftTime = totalWorkTime - this._info.pickSec;
		this._workLeftTime = totalWorkTime;
		this._workTime.text = cw.DateUtil.formatStr(this._workLeftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._base.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		// this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.addEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.onPickExpUpdateHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._base.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		// this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.removeEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.onPickExpUpdateHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e?:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._base.closeBtn:
				Manager.view.hide(ViewID.LandlordPressView);
				break;
			case this._btn2:
				Manager.control.getLaird().lairPickExp(0, this._info.id);
				// Manager.view.hide(ViewID.LandlordPressView);
				break;
		}
	}

	private onOkHandler():void
	{
		Manager.control.getLaird().lairPickExp(1, this._info.id);
		Manager.view.hide(ViewID.LandlordPressView);
	}

	private onPickExpUpdateHandler(e:LairdEvent):void
	{
		Manager.render.remove(this.timeHandler, this);
		this.initData();
	}

	public show(info:CoolyInfo):void
	{
		this._info = info;
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		Manager.render.remove(this.timeHandler, this);
		super.dispose();
		ObjectUtil.removes(this._base, this._nickName, this._level, this._workTime, this._exp, this._todayWorkTime, this._btn2);
		if(this._base)
			this._base.dispose();
		this._base = null;
		if(this._nickName)
			this._nickName.dispose();
		this._nickName = null;
		if(this._level)
			this._level.dispose();
		this._level = null;
		if(this._workTime)
			this._workTime.dispose();
		this._workTime = null;
		if(this._exp)
			this._exp.dispose();
		this._exp = null;
		if(this._todayWorkTime)
			this._todayWorkTime.dispose();
		this._todayWorkTime = null;
		// if(this._btn1)
		// 	this._btn1.dispose();
		// this._btn1 = null;
		if(this._btn2)
			this._btn2.dispose();
		this._btn2 = null;
		// if(this._gold)
		// 	this._gold.dispose();
		// this._gold = null;
		this._model = null;
		this._info = null;
	}
}