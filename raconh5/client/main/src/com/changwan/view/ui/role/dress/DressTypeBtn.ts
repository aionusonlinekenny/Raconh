/**
 * 装扮类型按钮
 * liangyan
 * create 2017-11-28
*/
class DressTypeBtn extends ItemRenderer
{
	private _redIcon:eui.Image;
	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("dress", "DressTypeBtnSkin");
	}

	protected dataChanged():void
	{
		super.dataChanged();
		this._redIcon.visible = this.data.redShow;
	}
	public showRedIcon(value:boolean):void
	{
		this._redIcon.visible = value;
	}

	protected createChildren():void
	{
		super.createChildren();

		GameDispatcher.getInstance().dispatchEventWith(BaseUIEvent.ITEM_RENDERER_COMPLETE, false, DressTypeBtn);
	}

	public dispose():void
	{
		super.dispose();
		this.removeChild(this._redIcon);
		this._redIcon = null;
	}
}