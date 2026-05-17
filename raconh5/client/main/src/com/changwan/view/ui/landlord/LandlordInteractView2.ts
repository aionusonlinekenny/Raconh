/**
 * 互动界面2
 */
class LandlordInteractView2 extends UIComponent
{
	private _back:eui.Group;
	private _value1:Label;
	private _name:Label;
	private _clubName:Label;
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

	private _bgImg:BitmapRemote;
	private _rightDownImg:BitmapRemote;

	private _thisParent:LandlordView;
	private _model:LairdModel;
	private _itemList:Array<eui.Image>;
	private _itemNameList:Array<Label>;
	private _typeList:Array<number>;

	private _itemInfo:ItemsCVO;

	public constructor(thisParent:LandlordView)
	{
		super();
		this.touchChildren = true;
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractViewSkin2");
	}

	protected configUI():void
	{
		super.configUI();

		this._model = Manager.model.getLaird();

		if(this._bgImg == null)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._back.addChild(this._bgImg);
			this._bgImg.load(Manager.path.getPanelLandlordPath("landlord_di2", "jpg"));
		}

		if(this._rightDownImg == null)
		{
			this._rightDownImg = Manager.pool.create(BitmapRemote);
			this._rightDownImg.x = -13;
			this._rightDownImg.y = 533;
			this._back.addChild(this._rightDownImg);
			this._rightDownImg.load(Manager.path.getPanelLandlordPath("landlord_kuang", "png"));
		}
	}

	protected initData():void
	{
		super.initData();
		
		this._name.text = "Lv." + this._model.lordInfoList[0].level + " " + this._model.lordInfoList[0].name;
		this._clubName.text = LangCVO.getContent("laird13", this._model.lordInfoList[0].guildName);

		this._itemList = [this._btn1, this._btn2, this._btn3, this._btn4];
		this._itemNameList = [this._name1, this._name2, this._name3, this._name4];
		this._typeList = [];
		let list:Array<LairdInteractInfo> = LairdCVO.getInteractByType(2);
		for(let i:number=0; i<list.length; i++)
		{
			this._itemNameList[i].text =  list[i].name;
			this._typeList.push(list[i].id);
		}

		let awardInfo:LairdAwardInfo = LairdCVO.getAward(2);
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
		// this._itemName.text = awardInfo.award.name + " X " + awardInfo.award.num;

		this.interactInfo();
	}

	private interactInfo():void
	{
		this._value1.text = (this._thisParent.interactInfo.value - this._model.lairdRoleInfo.interactCount) + "/" + this._thisParent.interactInfo.value;

		let leftTime:number = this._model.lairdRoleInfo.interactTimes - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
		if(leftTime <= 0)
			leftTime = 0;
		else
			Manager.render.add(this.timeHandler, this, 1000);
		this._time.text = cw.DateUtil.formatStr(leftTime, cw.DateUtil.LEFT_HH_MM_SS, true);
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
		this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
		this._itemName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
	}

	protected removeEvent():void
	{
		this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
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

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
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
				let index:number = this._itemList.indexOf(e.currentTarget);
				if(index != -1)
					Manager.control.getLaird().lairdInteract(this._typeList[index], this._model.lordInfoList[0].id);
				break;
		}
	}

	private onInfoUpdateHandler(e:LairdEvent):void
	{
		this.interactInfo();
	}

	public reuse(thisParent:LandlordView):void
	{
		super.reuse();
		this._thisParent = thisParent;
	}

	public dispose():void
	{
		Manager.render.remove(this.timeHandler, this);
		super.dispose();
		ObjectUtil.removes(this._back, this._value1, this._name, this._clubName, this._btn1, this._btn2, this._btn3, this._btn4, this._name1, 
			this._name2, this._name3, this._name4, this._itemName, this._time, this._bgImg, this._rightDownImg);
		this._back = null;
		if(this._value1)
			this._value1.dispose();
		this._value1 = null;
		if(this._name)
			this._name.dispose();
		this._name = null;
		if(this._clubName)
			this._clubName.dispose();
		this._clubName = null;
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
		if(this._bgImg)
			this._bgImg.dispose();
		this._bgImg = null;
		if(this._rightDownImg)
			this._rightDownImg.dispose();
		this._rightDownImg = null;
		this._thisParent = null;
		this._model = null;
		this._itemList = null;
		this._itemNameList = null;
		this._typeList = null;
	}
}