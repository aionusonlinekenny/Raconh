class ClubLeaderWarMatchingItem extends UIComponent
{
	private _name:Label;

	private _dataIndex:number;
	
	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarMatchingItemSkin");
	}

	/**数据列表顺序编号 */
	public set dataIndex(value:number)
	{
		this._dataIndex = value;
	}

	public get dataIndex():number
	{
		return this._dataIndex;
	}

	public setValue(value:string):void
	{
		this._name.text = value;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._name);
		if(this._name)
			this._name.dispose();
		this._name = null;
	}
}