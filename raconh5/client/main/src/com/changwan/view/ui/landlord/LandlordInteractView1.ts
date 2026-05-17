/**
 * 互动界面1
 */
class LandlordInteractView1 extends UIComponent
{
	private _value1:Label;
	private _value2:Label;
	private _item1:LandlordInteractItem;
	private _item2:LandlordInteractItem;

	private _thisParent:LandlordView;
	private _model:LairdModel;
	private _itemList:Array<LandlordInteractItem>;

	public constructor(thisParent:LandlordView)
	{
		super();
		this.touchChildren = true;
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractViewSkin1");
	}

	protected configUI():void
	{
		super.configUI();

		this._model = Manager.model.getLaird();
		this._itemList = [this._item1, this._item2];
	}

	protected initData():void
	{
		this._value1.text = (this._thisParent.interactInfo.value - this._model.lairdRoleInfo.interactCount) + "/" + this._thisParent.interactInfo.value;
		
		let totalExp:number = 0;
		let curExp:number = 0;
		let list:Array<CoolyInfo> = this._model.coolyInfoList;
		for(let i:number=0; i<this._itemList.length; i++)
		{
			this._itemList[i].type1.visible = (i + 1 <= list.length);
			this._itemList[i].type2.visible = !this._itemList[i].type1.visible;
			this._itemList[i].clickBack((index)=>{this.changeItem(index);});
		}
		for(let i:number=0; i<list.length; i++)
		{
			let coolyInfo:CoolyInfo = list[i];
			let expInfo:LairdExpInfo = LairdCVO.getExpInfoByLevel(coolyInfo.level);
			if(expInfo)
			{
				totalExp += Math.floor((coolyInfo.freeTimes - coolyInfo.catchTimes) / 60) * expInfo.exp;
				
				// let totalWorkTime:number = Math.floor((new Date).getTime() / 1000) - coolyInfo.catchTimes;
				// let workLeftTime:number = totalWorkTime - coolyInfo.pickSec;
				// if(workLeftTime < 0) workLeftTime = 0;
				// curExp += Math.floor(workLeftTime / 60) * expInfo.exp;

				curExp += Math.floor(coolyInfo.pickSec / 60) * expInfo.exp;
			}

			this._itemList[i].updateInfo(coolyInfo);
		}
		this._value2.text = StringUtils.getBigNum(curExp) + "/" + StringUtils.getBigNum(totalExp);

		if(this._model.coolyInfoList.length == 0)
		{
			this.changeItem(0);
		}
	}

	protected addEvent():void
	{
		super.addEvent();
		this._model.addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
		this._model.addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
	}

	protected removeEvent():void
	{
		this._model.removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
		this._model.removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
		super.removeEvent();
	}

	private onInfoUpdateHandler(e:LairdEvent):void
	{
		this.initData();
	}

	public changeItem(index:number):void
	{
		if(this._thisParent)
			this._thisParent.changeItem(index);
	}

	public reuse(thisParent:LandlordView):void
	{
		this._thisParent = thisParent;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._value1, this._value2, this._item1, this._item2);
		if(this._value1)
			this._value1.dispose();
		this._value1 = null;
		if(this._value2)
			this._value2.dispose();
		this._value2 = null;
		if(this._item1)
			this._item1.dispose();
		this._item1 = null;
		if(this._item2)
			this._item2.dispose();
		this._item2 = null;
		this._thisParent = null;
		this._model = null;
		this._itemList = null;
	}
}