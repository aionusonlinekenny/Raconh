/**
 * 市场背包
 * pzx
 * create 2018-4-12
 */
class MarketSaleBagItem extends  ItemRenderer{
	private _list:MarketSaleGoods[];
	public constructor()
    {
        super();
		this.skinName = Manager.path.getSkinName("market", "MarketSaleBagItemSkin");
    }
    protected createChildren():void
    {
        super.createChildren();
		if(!this._list)
		{
			this._list = [];
			for(let i:number = 0;i<5;i++)
			{
				let item:MarketSaleGoods = Manager.pool.create(MarketSaleGoods);
				item.x = 130 * i + 24;
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
		for(let i:number = 0;i<5;i++)
		{
			if(arr[i])
			{
				this._list[i].data = arr[i];
			}
			else
			{
				this._list[i].clear();
			}
		}
    }


    public dispose():void
    {
		if(this._list)
		{
			this._list.forEach((item,i)=>{
			item.dispose();
			})
			this._list = null;
		}
    }
}