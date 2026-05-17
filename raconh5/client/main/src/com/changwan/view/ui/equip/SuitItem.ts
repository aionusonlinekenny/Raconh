class SuitItem extends UIComponent
{
	private _item:EquipItem;
	private _kuang:eui.Image;
	private _equipItemIcon:eui.Image;
	private _tao1:eui.Image;
	private _tao2:eui.Image;
	private _redIcon:eui.Image;
	private _jieImg:eui.Image;
	private _jieTxt:Label;
	private _jiaLabel:Label;

	public constructor()
	{
		super();
		this.touchEnabled = true;
		this.skinName = Manager.path.getSkinName("equip", "SuitItemSkin");
	}

	protected configUI():void
	{
		super.configUI();
		this.touchEnabled = true;

		this._item.isSuitItem = true;
		this._item.jia = 0;
	}

	public get item():EquipItem
	{
		return this._item;
	}

	public get kuang():eui.Image
	{
		return this._kuang;
	}

	public tao(type):eui.Image
	{
		if(type == 1)
			return this._tao1;
		else
			return this._tao2;
	}

	public get equipImg():eui.Image
	{
		return this._equipItemIcon;
	}

	public get redIcon():eui.Image
	{
		return this._redIcon;
	}

	public set jie(value:number)
	{
		this._jieImg.visible = value > 0;
		this._jiaLabel.visible = this._jieImg.visible;
		if(value > 0)
			this._jieTxt.text = LangCVO.getContent("equip" + (40 + value));
			// this._jieTxt.text = value + LangCVO.getContent("common18");
		else
			this._jieTxt.text = "";
	}

	public clear():void
	{
		this._item.clear();
		this._kuang.visible = false;
		this._equipItemIcon.visible = true;
		this._tao1.visible = false;
		this._tao2.visible = false;
		this._redIcon.visible = false;
		this._jieImg.visible = false;
		this._jieTxt.text = "";
		this._jiaLabel.visible = false;
	}

	public dispose():void
	{
		super.dispose();

		if(this._item)
			this._item.dispose();
		this._item = null;
		this._kuang = null;
		this._equipItemIcon = null;
		this._tao1 = null;
		this._tao2 = null;
		this._redIcon = null;
		this._jieImg = null;
		this._jieTxt = null;
		this._jiaLabel = null;
	}
}