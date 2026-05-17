class EquipItem extends Goods
{
	public isShowTips:boolean = true;
	public isSuitItem:boolean = false;

    public constructor()
    {
        super();
		this.touchEnabled = true;
    }

	protected clickFun(e:egret.TouchEvent):void
	{
		let cvo:ItemsCVO = ItemsCVO.getCvo(this.baseId);
		if(this._data && cvo && this.isShowTips)
		{
			if(cvo.group==1)
			{
				Manager.view.show(ViewID.EquipTips, cvo, this._data);
			}
			else 
			{
				Manager.view.show(ViewID.ItemsTips, this._data);
			}
		}
	}

	public set jia(value:number)
	{
		this._jieTxt.visible = this._jieImg.visible = value > 0 ? true : false;
		if(value > 0)
			this._jieTxt.text = value + LangCVO.getContent("common18");
		else
			this._jieTxt.text = "";
	}

	protected showjie():void
	{
		if(!this.isSuitItem)
			super.showjie();
	}
}