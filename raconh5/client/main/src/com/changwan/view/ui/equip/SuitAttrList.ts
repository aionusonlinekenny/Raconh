class SuitAttrList extends ItemRenderer
{
	private _attr:Label;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("equip", "SuitAttrListSkin");
	}

	protected createChildren():void
    {
        super.createChildren();

		this._attr.multiline = true;
		this._attr.wordWrap = true;
		this._attr.lineSpacing = 8;
	}

	public dispose():void
	{
		super.dispose();

		this._attr = null;
	}
}