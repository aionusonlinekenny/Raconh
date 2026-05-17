class ToggleSwitch extends eui.ToggleSwitch implements cw.IDispose
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