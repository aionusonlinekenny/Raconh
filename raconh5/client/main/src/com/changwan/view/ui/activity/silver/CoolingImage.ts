/**
 *冷却矩形
 *luzh
 *create 2017-3.23
*/
class CoolingImage extends eui.Image implements cw.IDispose
{
    private _index:number;

	public constructor(radiu:number)
	{
		super();
        this.anchorOffsetX = this.anchorOffsetY = CoolingImage.ORIGIN_RADIU;
        this.scaleX = this.scaleY = radiu/CoolingImage.ORIGIN_RADIU;
	}

    public setSchedule(cur:number, total:number):void
    {
        let index:number = Math.floor(cur/total*CoolingImage.PIC_COUNT);
        if(index > CoolingImage.PIC_COUNT) index = CoolingImage.PIC_COUNT;

        if(this._index == index) return;
        this._index = index;
        // this.source = index > 0 ? "cooling_" + index + "_png" : null;
        this.texture = CoolingImage.getPic(this._index);
    }

    public dispose():void
    {
        this.texture = null;
        if(this.parent) this.parent.removeChild(this);
    }


    //----------------------------------------------------------------------
    private static ORIGIN_RADIU:number = 50;//原图大小
    private static PIC_COUNT:number = 120;//图片数量
    private static COOLING_PICS:Object = new Object();
    private static getPic(index:number):egret.Texture
    {
        if(index < 0) return null;
        if(this.COOLING_PICS[index] == null)
        {
            let shape:egret.Shape = new egret.Shape();
            ObjectUtil.drawSector(shape, this.ORIGIN_RADIU, this.ORIGIN_RADIU, this.ORIGIN_RADIU, 0x73E3FF, index / this.PIC_COUNT * 360, -90);
            let renderTexture:egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(shape);
            this.COOLING_PICS[index] = renderTexture;
        }
        return this.COOLING_PICS[index];
    }

}