/**
 * 互动界面
 */
class LandlordInteractView extends UIComponent
{
	private _base:BasePopUpView;
	private _btn1:eui.Image;
	private _btn2:eui.Image;
	private _btn3:eui.Image;
	private _btn4:eui.Image;
	private _name1:Label;
	private _name2:Label;
	private _name3:Label;
	private _name4:Label;
	private _itemName:Label;
	private _time:Label;

	private _itemList:Array<eui.Image>;
	private _itemNameList:Array<Label>;
	private _typeList:Array<number>;

	private _model:LairdModel;
	private _info:CoolyInfo;
	private _itemInfo:ItemsCVO;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractViewSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;
		this._base.titleImg.source = "landlord_titleHudong_png";
		this._itemList = [this._btn1, this._btn2, this._btn3, this._btn4];
		this._itemNameList = [this._name1, this._name2, this._name3, this._name4];
		this.onResizeHandler();
	}

	protected initData():void
	{
		super.initData();
		this._model = Manager.model.getLaird();

		this._typeList = [];
		let list:Array<LairdInteractInfo> = LairdCVO.getInteractByType(1);
		for(let i:number=0; i<list.length; i++)
		{
			this._itemNameList[i].text =  list[i].name;
			this._typeList.push(list[i].id);
		}

		let leftTime:number = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
		if(leftTime <= 0)
			leftTime = 0;
		else
			Manager.render.add(this.timeHandler, this, 1000);
		this._time.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);

		let awardInfo:LairdAwardInfo = LairdCVO.getAward(1);
		if(awardInfo)
		{
			let str:string = "";
			this._itemInfo = ItemsCVO.getCvo(awardInfo.award.baseId);
			if(this._itemInfo)
			{
				str = "<font color='"+ this._itemInfo.colorStr +"'><u>"+ awardInfo.award.name +"</u></font>" + " X " + awardInfo.award.num;
				HtmlUtil.setTextFlow(this._itemName, str);
			}
		}
	}

	private timeHandler():void
	{
		let leftTime:number = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
		if(leftTime < 0)
		{
			Manager.render.remove(this.timeHandler, this);
			return;
		}
		this._time.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._base.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._itemName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._base.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._itemName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
		super.removeEvent();
	}

	private onClickItemHandler(e?:egret.TouchEvent):void
	{
		if(this._itemInfo)
		{
			Manager.view.show(ViewID.ItemsTips, this._itemInfo);
		}
	}

	private onResizeHandler(e?:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		let target:any = e.currentTarget;
		switch(target)
		{
			case this._base.closeBtn:
				Manager.view.hide(ViewID.LandlordInteractView);
				break;
			case this._btn1:
			case this._btn2:
			case this._btn3:
			case this._btn4:
				let leftTime:number = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
				if(leftTime > 0)
				{
					FloatTips.addTips(LangCVO.getContent("laird10"), Color.RED);
					return;
				}
				let index:number = this._itemList.indexOf(target);
				if(index != -1)
					Manager.control.getLaird().lairdInteract(this._typeList[index], this._info.id);
				Manager.view.hide(ViewID.LandlordInteractView);
				break;
		}
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
		ObjectUtil.removes(this._base, this._btn1, this._btn2, this._btn3, this._btn4, this._name1, this._name2, this._name3, this._name4, this._itemName, this._time);
		if(this._base)
			this._base.dispose();
		this._base = null;
		this._btn1 = null;
		this._btn2 = null;
		this._btn3 = null;
		this._btn4 = null;
		if(this._name1)
			this._name1.dispose();
		this._name1 = null;
		if(this._name2)
			this._name2.dispose();
		this._name2 = null;
		if(this._name3)
			this._name3.dispose();
		this._name3 = null;
		if(this._name4)
			this._name4.dispose();
		this._name4 = null;
		if(this._itemName)
			this._itemName.dispose();
		this._itemName = null;
		if(this._time)
			this._time.dispose();
		this._time = null;
		this._itemList = null;
		this._itemNameList = null;
		this._typeList = null;
		this._info = null;
	}
}