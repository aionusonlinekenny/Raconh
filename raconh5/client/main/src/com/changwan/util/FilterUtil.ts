/**
 * pzx 
 * 17.11.23
 * 滤镜
 */
class FilterUtil
{
	private static BLUE_FILTER:Array<number> = [
			1,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,100,
			0,0,0,1,0];
	private static GREEN_FILTER:Array<number> = [
			1,0,0,0,0,
			0,1,0,0,100,
			0,0,1,0,0,
			0,0,0,1,0];
	private static WHITE_FILTER:Array<number> = [
			1,0,0,0,100,
			0,1,0,0,100,
			0,0,1,0,100,
			0,0,0,1,0];
	private static BLACK_FILTER:Array<number> = [
			1,0,0,0,-100,
			0,1,0,0,-100,
			0,0,1,0,-100,
			0,0,0,1,0];
	private static RED_FILTER:Array<number> = [
			1,0,0,0,100,
			0,1,0,0,0,
			0,0,1,0,0,
			0,0,0,1,0];
	
	
	private static TXT_GLOW_FILTER:egret.GlowFilter = new egret.GlowFilter(0x000000,1,1,1,3);
		/**设置成灰色 */
    public static setTxtFilter(...args):void
	{
		let filters:any;
		var i:number = 0 ;
        var len:number = args.length;
        while(i < len)
        {
			filters = args[i].filters ? args[i].filters : [];
			filters.push(this.TXT_GLOW_FILTER);
			args[i].filters = filters;
            i++;
        }
	}
	
	/**设置成灰色 */
    public static setGrayFilter(value:egret.DisplayObject):void
	{
		//颜色矩阵数组
		var colorMatrix = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		value.filters= [colorFlilter];
	}

    /**
     * 亮度滤镜
	 * @param bright:-255-255
     * */
    public static getBrightFilter(bright:number):egret.Filter
	{
		return new egret.ColorMatrixFilter([
			1,0,0,0,bright,
			0,1,0,0,bright,
			0,0,1,0,bright,
			0,0,0,1,0
		]);
	}

	/**
	 * 生命对象添加颜色滤镜，color对应ColorFilterType.ts
	 */		
	public static addAliveColorFilter(ani:egret.DisplayObject, color:number = 0):void 
	{
		let colorMat:egret.ColorMatrixFilter;
		switch(color)
		{
			case ColorFilterType.BLUE:
				colorMat = new egret.ColorMatrixFilter(this.BLUE_FILTER);
				break;
			case ColorFilterType.GREEN:
				colorMat = new egret.ColorMatrixFilter(this.GREEN_FILTER);
				break;
			case ColorFilterType.WHITE:
				colorMat = new egret.ColorMatrixFilter(this.WHITE_FILTER);
				break;
			case ColorFilterType.BLACK:
				colorMat = new egret.ColorMatrixFilter(this.BLACK_FILTER);
				break;
			case ColorFilterType.RED:
				colorMat = new egret.ColorMatrixFilter(this.RED_FILTER);
				break;
			default:
				colorMat = null;
				break;
		}
		this.removeColorMat(ani);
		if(!colorMat) return;
		let filters = ani.filters ? ani.filters : [];
		filters.push(colorMat);
		ani.filters = filters;
	}
	/**
	 * 去除变亮和变暗(恢复)
	 */	
	public static removeColorMat(display:egret.DisplayObject):void
	{
		let filters = display.filters;
		let len = filters ? filters.length : 0;
		for(let i = len - 1; i >= 0; i--)
		{
			if(filters[i] instanceof egret.ColorMatrixFilter) filters.splice(i,1);
		}
		display.filters = filters;
	}
}