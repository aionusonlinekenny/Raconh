/**
 *视图基类
 *devil
 *create 2017-11-01
 *update
*/
class Sprite extends egret.DisplayObjectContainer implements cw.IPool
{
	private _needAddToStage:boolean;
	private _disposeFlag:boolean = false;

	public constructor(needAddToStage:boolean=false)
	{
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
		this._needAddToStage = needAddToStage;
	}

	protected start():void{}

	protected addEvent():void
	{
		if(this._needAddToStage)
		{
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
		}
	}

	protected removeEvent():void
	{
		if(this._needAddToStage)
		{
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
		}
	}

	protected __addedToStage(e:egret.Event):void{}

	protected __removeFromStage(e:egret.Event):void{}

	public move(x:number,y:number):void
	{
		this.x = x;
		this.y = y;
	}

	public reuse(...args:any[]):void
	{
		this.start();
		this.addEvent();
	}

	public unuse():void
	{
		if(this.parent != null)this.parent.removeChild(this);
		this.removeEvent();
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.alpha = 1;
		this.scaleX = 1;
		this.scaleY = 1;
		this.rotation = 0;
		this.visible = true;
        this.touchEnabled = false;
		this.touchChildren = false;
		this.anchorOffsetX = 0;
		this.anchorOffsetY = 0;
        this.mask = null;
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
			Trace.error("Sprite同时删除多次");
		}
	}

	protected disposeSelf():void
	{
		if(this.parent != null)this.parent.removeChild(this);
		this.removeEvent();
	}
}