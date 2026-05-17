class ItemRenderer extends eui.ItemRenderer implements cw.IDispose
{
	protected _loadCompltet:boolean;
	public constructor()
	{
		super();
		this._loadCompltet = false

		// this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
	}

	// private __removeFromStage(e:egret.Event):void
	// {
	// 	if(this._loadCompltet)
	// 		this.dispose();
	// }

	protected createChildren():void
    {
        super.createChildren();
		this._loadCompltet = true;
    }

    public dispose():void
    {
		// this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
		if(this.parent)
		{
			this.parent.removeChild(this);
		}
	}
}