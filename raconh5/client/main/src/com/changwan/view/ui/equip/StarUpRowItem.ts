/**
 * 升星 一行item
 * drq
 * create 2018-4-16
 */
class StarUpRowItem extends  ItemRenderer{
	private _list:StarUpMainItem[];

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("equip", "StarUpRowItemSkin");
	}

	protected createChildren():void
    {
        super.createChildren();
		if(!this._list)
		{
			this._list = [];
			for(let i:number = 0;i<4;i++)
			{
				let item:StarUpMainItem = Manager.pool.create(StarUpMainItem);
				item.x = 141 * i + 24;
				item.y = -5;
				this.addChild(item);
				this._list.push(item);
			}
		}
    }

	protected dataChanged():void
    {
        super.dataChanged();
		let arr:Array<ItemsModelInfo> = this.data;
		for(let i:number = 0;i<4;i++)
		{
			if(arr[i])
			{
				this._list[i].setProperty(arr[i]);
			}
		}
    }

	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			
		}
        
	}

    public dispose():void
    {
        this.clear(true);
		this._list = null;
    }
}