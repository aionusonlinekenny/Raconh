/**
 *author Anydo
 *create 2018-4-15
 *description 
*/
class ButtonImage implements cw.IDispose
{
    private _imageContainer:egret.DisplayObjectContainer;

    private _imageBack:BitmapRes;
    private _imageLabel:BitmapRes;

    private _callback:Function;
    private _callbackTarget:any;

    private _width:number;
    private _height:number;
    private _labelSkin:string;
    private _backUpSkin:string;
    private _backDownSkin:string;
    private _backIsLoaded:boolean = false;
    private _labelIsLoaded:boolean = false;
	private _disposeFlag:boolean = false;
    
    private _enabled:boolean;
    public get enabled():boolean{ return this._enabled; }
    public set enabled(value:boolean)
    {
        if(this._enabled == value) return;
        this._enabled = value;
        if(this._enabled)
        {
            this._imageContainer.filters = null;
		    this._imageContainer.touchEnabled = true;
        }
        else
        {
		    this._imageContainer.touchEnabled = false;
            this._imageBack.source = this._backUpSkin;
            FilterUtil.setGrayFilter(this._imageContainer);
        }
    }

	public constructor()
	{
        
	}

    protected start(imageContainer:egret.DisplayObjectContainer, tx:number, ty:number):void
    {
        this._imageContainer = ObjectUtil.createConainer(true,false);
        this._imageContainer.x = tx;
        this._imageContainer.y = ty;
        imageContainer.addChild(this._imageContainer);

        this._imageBack = BitmapRes.create("", 0, 0, this._width, this._height, this.backLoadedComplete, this, );
        this._imageContainer.addChild(this._imageBack);
        this._imageBack.source = this._backUpSkin;

        if(this._labelSkin != "")
        {
            this._imageLabel = BitmapRes.create("", 0, 0, -1, -1, this.labelLoadedComplete, this);
            this._imageContainer.addChild(this._imageLabel);
            this._imageLabel.source = this._labelSkin;
        }
    }

	protected addEvent():void
	{
		this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDownHandler, this);
		this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_END, this.onUpHandler, this);
		this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onUpHandler, this);
	}

	protected removeEvent():void
	{
		this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDownHandler, this);
		this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_END, this.onUpHandler, this);
		this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onUpHandler, this);
	}

    private onUpHandler(e:egret.TouchEvent):void
	{
        if(this._backDownSkin == "") return;
        this._imageBack.source = this._backUpSkin;
    }

    private onDownHandler(e:egret.TouchEvent):void
	{
        if(!this._enabled) return;
        if(this._backDownSkin == "") return;
        this._imageBack.source = this._backDownSkin;
    }

    private onClickHandler(e:egret.TouchEvent):void
	{
        if(!this._enabled) return;
        if(this._callback != null)
        {
            this._callback.call(this._callbackTarget);
        }
    }

    private backLoadedComplete():void
    {
        if(this._backIsLoaded) return;
        this._backIsLoaded = true;
        this.setLabelPos();
    }

    private labelLoadedComplete():void
    {
        this._labelIsLoaded = true;
        this.setLabelPos();
    }

    private setLabelPos():void
    {
        if(!this._backIsLoaded || !this._labelIsLoaded) return;
        this._imageLabel.x = (this._imageBack.width - this._imageLabel.width) / 2;
        this._imageLabel.y = (this._imageBack.height - this._imageLabel.height) / 2;
    }

    public static create(imageContainer:egret.DisplayObjectContainer, backUpSkin:string, backDownSkin:string = "", labelSkin:string = "", clickCallback:Function = null, callbackTarget:any = null, twidth:number = -1, theight:number = -1, tx:number = 0, ty:number = 0):ButtonImage
    {
        let result:ButtonImage = Manager.pool.create(ButtonImage, imageContainer, backUpSkin, backDownSkin, labelSkin, clickCallback, callbackTarget, twidth, theight, tx, ty);
        return result;
    }

	public reuse(imageContainer:egret.DisplayObjectContainer, backUpSkin:string, backDownSkin:string = "", labelSkin:string = "", clickCallback:Function = null, callbackTarget:any = null, twidth:number = -1, theight:number = -1, tx:number = 0, ty:number = 0):void
	{
        this._backUpSkin = backUpSkin;
        this._backDownSkin = backDownSkin;
        this._labelSkin = labelSkin;
        this._width = twidth;
        this._height = theight;
        this._callback = clickCallback;
        this._callbackTarget = callbackTarget;
        this._enabled = true;
        this._backIsLoaded = false;
        this._labelIsLoaded = false;
        this._disposeFlag = false;
		this.start(imageContainer, tx, ty);
		this.addEvent();
	}

	public unuse():void
	{
		this.removeEvent();
        ObjectUtil.remove(this._imageContainer);
        this._imageContainer = null;
        if(this._imageBack)
        {
            Manager.pool.push(this._imageBack);
            this._imageBack = null;
        }
        if(this._imageLabel)
        {
            Manager.pool.push(this._imageLabel);
            this._imageLabel = null;
        }
        this._callback = null;
        this._callbackTarget = null;
        this._enabled = true;
        this._labelSkin = "";
        this._backUpSkin = "";
        this._backDownSkin = "";
	}

	public dispose():void
	{
		if(!this._disposeFlag)
		{
			this._disposeFlag = true;
			this.disposeSelf();
		}
		else
		{
			Trace.error("ButtonImage同时删除多次");
		}
	}

	protected disposeSelf():void
	{
		this.removeEvent();
        ObjectUtil.remove(this._imageContainer);
        this._imageContainer = null;
        if(this._imageBack)
        {
            Manager.pool.push(this._imageBack);
            this._imageBack = null;
        }
        if(this._imageLabel)
        {
            Manager.pool.push(this._imageLabel);
            this._imageLabel = null;
        }
        this._callback = null;
        this._callbackTarget = null;
	}
}