class RadioButton extends eui.RadioButton implements cw.IDispose
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