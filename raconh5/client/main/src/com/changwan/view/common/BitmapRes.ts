/**
 * 动态加载资源位图
 * devil
 * create  2017-11-14
 * update
*/

class BitmapRes extends egret.Bitmap implements cw.IPool
{
    private _disposeFlag:boolean;
    private _callback:Function;
    private _thisObj:any;
    private _width:number;
    private _height:number;
    private _name:string;
    
    public unuse():void
    {
        this.touchEnabled = false;
        this._disposeFlag = false;
        this._callback = null;
        this._thisObj = null;
        if(this._name != null && this._name != "")Manager.loader.removeTexture(this._name,this.complete,this);
        this._name = null;
        Manager.pool.unuseBitmap(this);
        this.x = 0;
        this.y = 0;
        if(this.parent) this.parent.removeChild(this);
    }

    public static create(name:string,x:number = 0,y:number = 0,width:number = -1,height:number = -1,callBack:Function = null,target:any = null):BitmapRes
    {
        let result:BitmapRes = Manager.pool.create(BitmapRes,name,callBack,target,width,height);
        result.x = x;
        result.y = y;
        return result;
    }

    public reuse(name:string = "", callback:Function = null, thisObj:any = null, width:number = -1, height:number = -1):void
    {
        this.bitmapData = null;
        this.texture = null;
        this._callback = callback;
        this._thisObj = thisObj;
        this._width = width;
        this._height = height;
        this._name = name;
        if(this._name != null && this._name != "")Manager.loader.loadTexture(name,this.complete,this);
    }

    public set source(value:string)
    {
        if(this._name == value) return;
        this.bitmapData = null;
        this.texture = null;
        Manager.loader.removeTexture(this._name,this.complete,this);
        this._name = value;
        if(value == null || value == "") return;
        Manager.loader.loadTexture(this._name,this.complete,this);
    }

    private complete(texture:egret.Texture):void
    {
        if(!this._disposeFlag && texture)
        {
            this.texture = texture;
            this.width = this._width < 0 ? this.texture.textureWidth : this._width;
            this.height = this._height < 0 ? this.texture.textureHeight : this._height;
            if(this._callback != null) this._callback.call(this._thisObj);
        }
    }

    public setWidth(value:number):void
    {
        this._width = value;
        if(this.texture)
        {
            this.width = value;
        }
    }

    public pool():void
    {
        Manager.pool.push(this);
    }

    public getName():string
    {
        return this._name;
    }

    public dispose():void
    {
        if(this._name != null && this._name != "")Manager.loader.removeTexture(this._name,this.complete,this);
        if(this.parent != null)this.parent.removeChild(this);
        this.bitmapData = null;
        this.texture = null;
        this._disposeFlag = true;
    }

}