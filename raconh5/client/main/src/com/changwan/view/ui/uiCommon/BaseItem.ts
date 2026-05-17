/**
 * 物品基类
 */
class BaseItem extends Sprite
{
	private _itemImg:BitmapRemote;

	private _itemInfo:ItemsModelInfo;
	private _pathInfo:PathInfo;

	public constructor()
	{
		super();
		this.start();
		this.addEvent();
	}

	protected start():void
	{
		super.start();
		this.width = 141;
		this.height = 141;

		this._itemImg = Manager.pool.create(BitmapRemote);
		this._itemImg.x = 31;
		this._itemImg.y = 31;
		this.addChild(this._itemImg);
	}

	protected addEvent():void
    {
		super.addEvent();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickFun,this);
	}

	protected removeEvent():void
    {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickFun,this);
		super.removeEvent();
	}

	protected clickFun(e:egret.TouchEvent):void
	{
		if(this._itemInfo.cvo)
		{
			if(this._itemInfo.cvo.group == 1)
			{
				Manager.view.show(ViewID.BagEquipTips, this._itemInfo);
			}
			else
			{
				Manager.view.show(ViewID.ItemsTips, this._itemInfo);
			}
		}
	}

	public reuse(itemInfo:ItemsModelInfo):void
	{
		super.reuse();
		this.touchEnabled = true;
		this._itemInfo = itemInfo;
		if(this._itemInfo)
			this._itemImg.load(Manager.path.getIconPath(this._itemInfo.cvo.imgId), 80, 80);
	}

	public unuse():void
	{
		super.unuse();
		this.clean();
	}

	private clean():void
	{
		if(this._itemImg)
			Manager.pool.push(this._itemImg);
		this._itemImg = null;
		this._itemInfo = null;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._itemImg);
		this.clean();
	}
}