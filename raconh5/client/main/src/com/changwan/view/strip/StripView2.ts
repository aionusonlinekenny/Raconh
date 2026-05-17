/**
 * 面板上的进度条
 * liangyan
 * create 2017-12-14
 * @update devil 2018-04-19
*/
class StripView2 extends BaseStripView2
{
    private _back:BitmapRes;
    private _strip:BitmapRes;
    private _sWidth:number;
    private _sHeight:number;
    private _bWidth:number;
    private _bHeight:number;
    private _initW:number;

    public constructor(uiImageLayer:egret.DisplayObjectContainer,uiLayer:egret.DisplayObjectContainer)
    {
        super(uiImageLayer,uiLayer);
    }

    
    /**修正用BitmapRes创建strip，complete方法会重置strip的宽度 */
    private __stripComplete():void
    {
        this._strip.width = this._initW;
    }

    private reuse(backSource:string,stripSource:string,bWidth:number,bHeight:number,sWidth:number,sHeight:number,x:number,y:number,needTxt:boolean=false,isBackFront:boolean = false,size:number = 24):void
    {
        this._bWidth = bWidth;
        this._bHeight = bHeight;
        this._sWidth = sWidth;
        this._sHeight = sHeight;
        this._initW = this._sWidth;
        this._back = BitmapRes.create(backSource,0,0,this._bWidth,this._bHeight);
        this._strip = BitmapRes.create("",x,y,this._sWidth,this._sHeight,this.__stripComplete,this);
        this._strip.source = stripSource;
        if(isBackFront)
        {
            // 设置背景在进度条元素前面，适用于背景进度条区域透明的情况 *
            this._imageLayer.addChild(this._strip);
            this._imageLayer.addChild(this._back);
        }
        else
        {
            this._imageLayer.addChild(this._back);
            this._imageLayer.addChild(this._strip);
        }

        if(needTxt && this._txt == null)
        {
            this._txt = TextField.create(this._sWidth,this._sHeight,0xFFF7E6,size,"center","middle");
            this._txt.x = x;
            this._txt.y = y;
            this._layer.addChild(this._txt);
        }
        // super.reuse(null);
    }

    protected setPer(per:number):void
    {
        if(per < 0) per += 1;
        this._initW = this._sWidth * per;
        if(this._strip != null) this._strip.width = this._sWidth * per;
    }

	/**更新 */		
	public update(current:number, total:number, fullFirst:boolean = false):void
	{
        if(current < 0) current = 0;
        if(total <= 0) return;
		if(current > total) current = total;
        if(this._txt)this._txt.text = current + "/" + total;
		this.updatePercent(current / total, fullFirst);
	}

    // public unuse():void
    // {
    //     super.unuse();
    //     Manager.pool.push(this._back);
	// 	this._back = null;
    //     Manager.pool.push(this._strip);
    //     this._strip = null;
    // }

	public dispose():void
	{
        Manager.pool.push(this._back);
		this._back = null;
        Manager.pool.push(this._strip);
        this._strip = null;
		super.dispose();
	}

    public static create(imageLayer:egret.DisplayObjectContainer,layer:egret.DisplayObjectContainer,backSource:string,stripSource:string,bWidth:number,bHeight:number,sWidth:number,sHeight:number,x:number,y:number,needTxt:boolean=false,isBackFront:boolean = false,size:number = 24):StripView2
    {
        let result = new StripView2(imageLayer,layer);
        result.reuse(backSource,stripSource,bWidth,bHeight,sWidth,sHeight,x,y,needTxt,isBackFront,size);
        return result;
    }

    // public pool():void
    // {
    //     Manager.pool.push(this);
    // }
}