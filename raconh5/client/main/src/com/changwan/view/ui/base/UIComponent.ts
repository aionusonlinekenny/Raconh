/**
 * update devil 2017-11-23
 */
class UIComponent extends eui.Component implements eui.UIComponent, cw.IPool
{
    private _invalidHash;
    protected _loadComplete:boolean;

    public constructor()
    {
        super();
		this._invalidHash = {};
        this._loadComplete = false;
		this.touchEnabled = false;
		this.touchChildren = false;
		this.invalidate(InvalidationType.ALL);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onCompleteHandler, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
    }

    private __addedToStage(e:egret.Event):void
	{
		this.dispatchRender();
	}

	private __removeFromStage(e:egret.Event):void
	{
		this.removeRender();
	}

	private validate():void
	{
		this._invalidHash = {};
	}

	protected invalidate(property:string):void
	{
		this._invalidHash[property] = true;
		this.dispatchRender();
	}

	protected isInvalid(...properties:any[]):boolean
	{
		if(this._invalidHash[InvalidationType.ALL])return true;
		while(properties.length > 0)
		{
			if(this._invalidHash[properties.pop()])return true;
		}
		return false;
	}

	protected drawAll():void
    {
        this.drawInit();
    }

	protected draw():void{}

	private drawNow():void
	{
		if(this.isInvalid(InvalidationType.ALL)) this.drawAll();
		else this.draw();
		this.validate();
	}

    private dispatchRender():void
	{
		if(this.stage == null || !this._loadComplete) return;
		Manager.render.add(this.renderInvalid, this);
	}

	private removeRender():void
	{
		Manager.render.remove(this.renderInvalid, this);
	}

	protected renderInvalid(interval:number):void
	{
		this.removeRender();
		this.drawNow();
	}

    private onCompleteHandler(e:eui.UIEvent):void
    {
        this._loadComplete = true;
        this.dispatchRender();
    }

    protected configUI():void
    {
        
    }

	protected initData():void
	{}

    private drawInit():void
    {
        this.configUI();
        this.addEvent();
		this.initData();
    }

    protected addEvent():void
    {
    }

    protected removeEvent():void
    {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onCompleteHandler, this);
    }

    public dispose():void
    {
        this.removeRender();
		this.removeEvent();
		for(let key in this._invalidHash)
		{
			delete this._invalidHash[key];
		}
        this._invalidHash = null;
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
        if(this.parent)this.parent.removeChild(this);
    }

    public reuse(...args:any[]):void
	{
		this._invalidHash = {};
		this.invalidate(InvalidationType.ALL);
    }

    public unuse():void
    {
        this.removeEvent();
		this.removeRender();
		this.touchEnabled = false;
		this.touchChildren = false;
		for(let key in this._invalidHash)
		{
			delete this._invalidHash[key];
		}
        if(this.parent)this.parent.removeChild(this);
    }
}