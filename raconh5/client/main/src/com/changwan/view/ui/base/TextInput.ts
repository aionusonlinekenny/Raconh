class TextInput extends eui.TextInput implements cw.IDispose
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