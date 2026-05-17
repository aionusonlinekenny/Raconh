/**
 * 加载外部图片视图
 * luzhihong
 * create 2017-11-02
 */
class BitmapRemote extends UIComponent implements cw.IPool
{
    private _path:PathInfo;
    private _bitmap:egret.Bitmap;
    
    private _width:number;
    private _height:number;

    private _callback:Function;
    private _thisObj:any;

    public constructor()
    {
        super();
        this._bitmap = Manager.pool.create(egret.Bitmap);
        this.addChild(this._bitmap);
    }

    public load(path:PathInfo, tWidth:number=-1, tHeight:number=-1, callback:Function = null, thisObj:any = null):void
    {       
        if(this._path == path) return;
        //停止加载上一个
        if(this._path != null) Manager.loader.remove(this._path, this.onLoadImgComplete, this);

        this._path = path;
        this._width = tWidth;
        this._height = tHeight;
        this._callback = callback;
        this._thisObj = thisObj;
        
        if(this._path == null)
        {
            this._bitmap.bitmapData = null;//空路径
        }
        else
        {
            Manager.loader.load(this._path, this.onLoadImgComplete, this, ResourceGCType.COMMON);//开始加载
        }
    }

    public pool():void
    {
        Manager.pool.push(this);
    }

    public setSize(tWidth:number, tHeight:number):void
    {
        if(this._width == tWidth && this._height == tHeight) return;
        this._width = tWidth;
        this._height = tHeight;
        if(this._bitmap.bitmapData)
        {
            this.width = this._height;
            this.height = this._height;
        }
    }

    private onLoadImgComplete(loader:Loader/*data:egret.Texture*/):void
	{
        this._bitmap.bitmapData = loader.data;
        // if(!this._bitmap.bitmapData)
        // {
        //     this._bitmap.texture = loader.data;
        // }
        if(this._width > 0) this._bitmap.scaleX = this._width / this._bitmap.width;
        if(this._height > 0) this._bitmap.scaleY = this._height / this._bitmap.height;
        this.width = this._bitmap.width;
        this.height = this._bitmap.height;

        if(this._callback != null && this._thisObj != null)
        {
            this._callback.call(this._thisObj);
        }
    }

    public unuse()
    {
        if(this._path != null) Manager.loader.remove(this._path, this.onLoadImgComplete, this);
        ObjectUtil.removes(this);
        Manager.pool.push(this._bitmap);
        this._bitmap = null;
        this.x = 0;
        this.y = 0;
        this._width = 0;
        this._height = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this._path = null;
        this.filters = [];
        this.visible = true;
        this.rotation = 0;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        if(this.mask) this.mask = null;
    }

    public reuse(path:PathInfo=null, tWidth:number=-1, tHeight:number=-1):void
    {
        if(this._bitmap == null)
        {
            this._bitmap = Manager.pool.create(egret.Bitmap);
            this.addChild(this._bitmap);
        }
        this._bitmap.bitmapData = null;
        if(!!path) this.load(path, tWidth, tHeight);
    }

    public getWidth():number
    {
        return (this._width > 0) ? this._width : this.width;
    }

    public getHeight():number
    {
        return (this._height > 0) ? this._height : this.height;
    }

    public getBitmap():egret.Bitmap
    {
        return this._bitmap;
    }

    public dispose():void
    {
        if(this._path != null) Manager.loader.remove(this._path, this.onLoadImgComplete, this);
        ObjectUtil.removes(this);
        Manager.pool.push(this._bitmap);
        this._bitmap = null;
        this._path = null;
    }
}