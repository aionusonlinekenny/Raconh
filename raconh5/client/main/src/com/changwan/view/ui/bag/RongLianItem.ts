/**
 * 装备熔炼
 * Simon 2017.12.1
 */
class RongLianItem extends ItemRenderer
{
    private _item:EquipItem;

	public constructor()
	{
		super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("bag", "RonglianItemSkin");

		this.initView();
	}

    private initView():void
    {
        this._item = new EquipItem();
        this.addChild(this._item);
    }

    protected dataChanged():void
    {
        let info:ItemsModelInfo = this.data as ItemsModelInfo;
        if(info)
        {
            this._item.data = info;
            // this._item.baseId = info.base_id;
            // this._item.count = info.quantity;
            // this._item.bind = info.bind;
        }
    }
}