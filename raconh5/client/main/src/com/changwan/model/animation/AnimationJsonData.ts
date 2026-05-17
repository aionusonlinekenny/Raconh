/**
 *author Anydo
 *create 2018-3-13
 *description 
*/
class AnimationJsonData
{
    public frameName:string;
    public offX:number;
    public offY:number;
    public rectObj:any;

    public reuse(frameName:string, offX:number, offY:number, rectObj:any):void
	{
        this.frameName = frameName;
        this.offX = offX;
        this.offY = offY;
        this.rectObj = rectObj;
	}

	public unuse():void
	{
        this.offX = 0;
        this.offY = 0;
        this.frameName = "";
        this.rectObj = null;
	}

    public dispose():void
    {
        this.rectObj = null;
    }
}