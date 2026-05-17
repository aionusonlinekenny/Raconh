class SuitAllAttrItem extends ItemRenderer
{
	private _topLine:eui.Image;
	private _equipName:Label;
	private _attrValue:Label;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("equip", "SuitAllAttrItemSkin");
	}

	protected createChildren():void
    {
        super.createChildren();

		this._attrValue.multiline = true;
		this._attrValue.wordWrap = true;
		this._attrValue.lineSpacing = 10;
	}

	protected dataChanged():void
    {
		if(this.data.index == 0)
			this._topLine.visible = false;
		HtmlUtil.setTextFlow(this._equipName, this.data.equipName);
		HtmlUtil.setTextFlow(this._attrValue, this.data.suitAttr);
	}

	public dispose():void
	{
		super.dispose();

		this._topLine = null;
		if(this._equipName)
			this._equipName.dispose();
		this._equipName = null;
		if(this._attrValue)
			this._attrValue.dispose();
		this._attrValue = null;
	}
}