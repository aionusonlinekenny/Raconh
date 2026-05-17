class RenderSprite extends Sprite
{
	private _invalidHash;

	public constructor()
	{
		super(true);
	}

	protected start():void
	{
		super.start();
		this._invalidHash = {};
		this.invalidate(InvalidationType.ALL);
	}

	protected __addedToStage(e:egret.Event):void
	{
		this.dispatchRender();
	}
	
	protected __removeFromStage(e:egret.Event):void
	{
		this.removeRender();
	}

	private validate():void
	{
		this._invalidHash = {};
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

	protected invalidate(property:string):void
	{
		this._invalidHash[property] = true;
		this.dispatchRender();
	}

	protected drawAll():void{}

	protected draw():void{}

	private drawNow():void
	{
		if(this.isInvalid(InvalidationType.ALL)) this.drawAll();
		else this.draw();
		this.validate();
	}

	protected dispatchRender():void
	{
		if(this.stage == null) return;
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

	public unuse():void
	{
		super.unuse();
		this.removeRender();
		for(let key in this._invalidHash)
		{
			delete this._invalidHash[key];
		}
	}

	protected disposeSelf():void
	{
		super.disposeSelf();
		this.removeRender();
		for(let key in this._invalidHash)
		{
			delete this._invalidHash[key];
		}
	}
}