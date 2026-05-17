/**
 *author Anydo
 *create 2018-3-1
 *description 
*/
class AnimationFrameData
{
    public offX:number;
    public offY:number;
    public texture:egret.Texture;

    public reuse(offX:number, offY:number, texture:egret.Texture):void
	{
        this.offX = offX;
        this.offY = offY;
        this.texture = texture;
	}

	public unuse():void
	{
        this.offX = 0;
        this.offY = 0;
        Manager.pool.push(this.texture);
        this.texture = null;
	}

    public dispose():void
    {
        Manager.pool.push(this.texture);
        this.texture = null;
    }
}