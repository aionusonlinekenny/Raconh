/**
 * 升星 主装备item
 * drq
 *  2018.04.12
 */
class StarUpMainItem extends UIComponent{
	private _item:BaseGoods;
	private _data:ItemsModelInfo;
	private _yichuandai:eui.Group;

	public constructor() {
		super();
        this.skinName = Manager.path.getSkinName("equip", "StarUpItemSkin");
		this._item = Manager.pool.create(BaseGoods);
        this.addChild(this._item);
		this.swapChildren(this._yichuandai,this._item);
	}

	protected addEvent():void
    {
		super.addEvent();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickItem,this);
    }

    protected removeEvent():void
    {
		super.removeEvent();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickItem,this);
    }

	private onClickItem(e:egret.TouchEvent = null):void
	{
		Manager.view.hide(ViewID.StarUpExplainView);
		let view = Manager.view.getView(ViewID.EquipPanel) as EquipPanel;
		if(view)
		{
			view.curView.updateMainEquip(this._data);
		}
	}

	protected configUI():void
	{	
		super.configUI();
		
	}

	public setProperty(data:ItemsModelInfo):void
    {
		if(data)
		{
			this._data = data;
			this._item.setCvo(data.cvo);
			if(data)
			{
				this.touchEnabled = true;
			}
			this._item.setStar(this._data.getStar());
			this._yichuandai.visible = false;
			if(this._data.storagetype == 1)
			{
				this._yichuandai.visible = true;
			}
		}
    }

	public dispose():void
	{
		super.dispose();
		ObjectUtil.dispose(this._item);
		this._item = null;
		this._data = null;
	}
}