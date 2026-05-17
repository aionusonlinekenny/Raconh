class LandlordHistoryItem extends ItemRenderer
{
	private _time:Label;
	private _content:Label;
	private _line:eui.Image;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("landlord", "LandlordHistoryItemSkin");
	}

	protected dataChanged():void
	{
		this._time.text = cw.DateUtil.formatStr(this.data.time, cw.DateUtil.YYYY_MM_DD_HH_MM_SS);
		HtmlUtil.setTextFlow(this._content, this.data.content);
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._time, this._content, this._line);
		if(this._time)
			this._time.dispose();
		this._time = null;
		if(this._content)
			this._content.dispose();
		this._content = null;
		this._line = null;
	}
}