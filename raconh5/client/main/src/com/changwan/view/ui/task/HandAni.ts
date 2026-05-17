/**
 * 点击手势
 * luzh 
 * 2018.2.26
 */
class HandAni extends eui.Image implements cw.IDispose 
{
    private _isFirst:boolean;

	public constructor(x:number, y:number) 
    {
		super();
		this.x = x;
		this.y = y;
		this.play();
	}

	private countDown():void
	{
        this._isFirst = !this._isFirst;
        this.source = this._isFirst ? "guide_hand0_png" : "guide_hand1_png";
	}

	public play():void
	{
		Manager.render.add(this.countDown, this, 500);
	}

	public pause():void
	{
		Manager.render.remove(this.countDown, this);
	}

	public dispose():void
	{
		if(Manager.render.contains(this.countDown, this)) Manager.render.remove(this.countDown, this);
		if(this.parent != null)this.parent.removeChild(this);
	}
}