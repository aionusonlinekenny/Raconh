class Goods extends BaseGoods {
	public _data:ItemsModelInfo;
	public constructor() {
		super();
	}
	public set data(value:ItemsModelInfo)
	{
		this._data = value;
		if(this._data)
		{
			this.baseId = value.base_id
			this.bind = value.bind;
			this.count = value.quantity;
			this.setStar(value.getStar())
		}
		else 
		{
			this.clear();
		}
	}
	public get pos():number
	{
		if(this._data)
			return this._data.pos;
		return -1;
	}
	public get id():number
	{
		if(this._data)
			return this._data.id;
		return 0;
	}
	protected clickFun(e:egret.TouchEvent):void
	{
		let cvo:ItemsCVO = ItemsCVO.getCvo(this.baseId);
		if(this._data && cvo)
		{
			if(cvo.group==1)
			{
				Manager.view.show(ViewID.BagEquipTips, this._data);
			}
			else 
			{
				Manager.view.show(ViewID.ItemsTips, this._data);
			}
		}
	}
	public clear():void
	{
		super.clear();
		this._data = null;
	}

	public unuse():void
	{
		super.unuse();
		this.clear();
		this.x = this.y = 0;
	}

	public reuse():void
	{
		super.reuse();
	}
	
	public dispose():void
	{
		this._data = null;
		super.dispose();
	}

}