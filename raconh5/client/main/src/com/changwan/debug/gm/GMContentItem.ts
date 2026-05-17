class GMContentItem extends ItemRenderer
{
	private _content:Label;
	// private _isSetData:boolean = false;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("debug", "GMContentItemSkin");
	}

	protected dataChanged():void
	{
		this._content.text = this.data as string;
		this._content.height = this._content.textHeight;
		this.height = this._content.textHeight + 5;
		// if(!this._isSetData)
		// {
		// 	this._isSetData = true;
		// 	GameDispatcher.getInstance().dispatchEventWith(BaseUIEvent.ITEM_RENDERER_COMPLETE, false);
		// }
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._content);
		if(this._content)
			this._content.dispose();
		this._content = null;
	}
}