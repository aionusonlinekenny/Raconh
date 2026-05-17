class Button extends eui.Button implements cw.IDispose
{
    public constructor()
    {
        super();
    }

    public dispose():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        if(this.parent)
		{
			this.parent.removeChild(this);
		}
    }

    public move(x:number,y:number):void
    {
        this.x = x;
        this.y = y;
    }
    public setSize(width:number,height:number):void
    {
        this.width = width;
        this.height = height;
    }
}