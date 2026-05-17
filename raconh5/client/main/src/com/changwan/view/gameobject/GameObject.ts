class GameObject extends RenderSprite
{
	protected _shadow:BitmapRes;//阴影
	protected _info:GameObjectInfo;
	public get info():GameObjectInfo
	{
		 return this._info; 
	}

	private _isInitialize:boolean;//是否始化过，在深度排序过程中，避免addToStage会重复值行

	public constructor()
	{
		super();
		this._isImmediately = true;
	}

	public reuse(info:GameObjectInfo):void
	{
		this._info = info;
		this._info.isInMapFlag = true;
		super.reuse();
	}

	public unuse():void
	{
		super.unuse();
		if(!this._isImmediately)Manager.pool.push(this._info);
		this._isImmediately = true;
		this._isInitialize = false;
		this._info.isInMapFlag = false;
		this._info = null;
		if(this._shadow)
		{
			Manager.pool.push(this._shadow);
			this._shadow = null;
		}
		Manager.render.remove(this.immediatelyDispose, this);
	}

	public eventPosition():void
	{
		this.move(this._info.x,this._info.y);
		if(this._shadow)
		{
			this._shadow.x = this._info.x - 58.5;
			this._shadow.y = this._info.y - 20.5;
		}
	}
	
	private _isImmediately:boolean;
	public eventRemove(isImmediately?:boolean,delayTime?:number):void
	{
		this._isImmediately = isImmediately;
		if(isImmediately) this.immediatelyDispose();
		else this.delayDispose(delayTime);
	}

	private delayDispose(delayTime:number):void
	{
		this.removeEvent();
		Manager.render.add(this.immediatelyDispose, this, delayTime, 1);
	}

	private immediatelyDispose():void
	{
		Manager.control.getMap().removeGameObject(this);
	}

	protected start():void
	{
		super.start();
		let goType:number = this.info.getType();
		if(goType != GameObjectType.DROP && goType != GameObjectType.JUMP_POINT && goType != GameObjectType.SCENE_EFF)
		{
			this._shadow = Manager.pool.create(BitmapRes,"common_shadow_png");
			Manager.layer.shadowLayer.addChild(this._shadow);
		}
	}
		
	protected __addedToStage(e:egret.Event):void
	{
		if(this._isInitialize)return;
		this._isInitialize = true;
		super.__addedToStage(e);
		this.reset();
	}

	/**
	 * 填加进场景中执行 
	 */		
	protected reset():void
	{
		this.eventPosition();
	}

	protected disposeSelf():void
	{
		this._info.isInMapFlag = false;
		Manager.render.remove(this.immediatelyDispose, this);
		super.disposeSelf();
		this._info = null;
		if(this._shadow)
		{
			Manager.pool.push(this._shadow);
			this._shadow = null;
		}
	}
}