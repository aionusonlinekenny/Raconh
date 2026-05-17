class CheckBox extends eui.CheckBox implements cw.IDispose
{
    public constructor()
    {
        super();
    }

    public dispose():void
    {
        if(this.parent)
		{
			this.parent.removeChild(this);
		}
    }
}