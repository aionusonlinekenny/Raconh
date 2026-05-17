class BaseRender implements cw.IDispose
{
    private _invalidHash;
	protected _contentWidth:number;
    protected _contentHeight:number;
    public constructor()
    {
    }

    protected start():void
    {
		this._invalidHash = {};
		this.invalidate(InvalidationType.ALL);
    }

	protected dispatchRender():void
	{
		Manager.render.add(this.renderInvalid, this);
	}

	protected renderInvalid(interval:number):void
	{
		this.removeRender();
		this.drawNow();
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

	private validate():void
	{
		this._invalidHash = {};
	}

	protected drawAll():void{}

	protected draw():void{}

	private drawNow():void
	{
		if(this.isInvalid(InvalidationType.ALL)) this.drawAll();
		else this.draw();
		this.validate();
	}

	private removeRender():void
	{
		Manager.render.remove(this.renderInvalid, this);
	}

	protected invalidate(property:string):void
	{
		this._invalidHash[property] = true;
		this.dispatchRender();
	}

    protected addEvent():void
    {

    }

    protected removeEvent():void
    {

    }

	protected stop():void
	{
		this.removeRender();
		this.validate();
	}

	public dispose():void
	{
		this.removeRender();
		for(let key in this._invalidHash)
		{
			delete this._invalidHash[key];
		}
	}
}