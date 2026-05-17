class Action implements cw.IPool
{
    protected _info:AliveGameObjectInfo;
	protected _path:egret.Point[];
	protected _target:egret.Point;//路径的最后一点，目标点
	private _complete:Function;//走路完成的回调函数
	private _completeTarget:any;//走路完成的回调函数target
	protected _finishPos:egret.Point;//运行过程中，路径数组中的点
	// protected _lastTickTime:number;
	private _totalTime:number;
	private _stepX:number;//X方向步进
	private _stepY:number;//Y方向步进
	private _tempX:number;
	private _tempY:number;
	protected _walkType:number;//对应WalkType.ts
	
	private SPRINT_SPEED:number = 950;
	private SLIDE_SPEED:number = 800;
	private OVER_WATER_SPEED:number = 800;
	
	/** 宠物render一直存在，其他用到的时候添加不用的时候移除 */
	public constructor()
	{}

    public reuse(info:AliveGameObjectInfo):void
    {
		this._path = [];
        this._info = info;
        if(this._info.getAliveFlag())this._info.setActionStr(FigureAction.STAND);
        else this._info.setActionStr(FigureAction.DEAD);
		if(this.isPetInfo) this.addRenderTick();
    }

    public unuse():void
    {
        this._info = null;
		// egret.stopTick(this.render,this);
		Manager.render.remove(this.render,this);
        this._path.length = 0;
        this._path = null;
        this._target = null;
        this._complete = null;
        this._completeTarget = null;
        this._finishPos = null;
		this._totalTime = 0;
		this._stepX = 0;
		this._stepY = 0;
		this._tempX = 0;
		this._tempY = 0;
		this._walkType = 0;
    }

	protected get isPetInfo():boolean
	{
		return (this._info instanceof PetGameObjectInfo);
	}

	public getWalkTarget():egret.Point
	{
		return this._target;
	}

	protected addRenderTick():void
	{
		// this._lastTickTime = egret.getTimer();
		// egret.startTick(this.render,this);
		Manager.render.add(this.render,this);
	}

	/**
	 * 走路
	 */
    public walk(path:egret.Point[], walkType:number, complete?:Function, completeTarget?:any):void
    {
		this._path = path.concat();
		this._target = path[path.length - 1];
		this._walkType = walkType;
		this._complete = complete;
		this._completeTarget = completeTarget;
		this._stepX = 0;
		this._stepY = 0;
		this._tempX = 0;
		this._tempY = 0;
		this._totalTime = 0;
		if(!this.isPetInfo) this.addRenderTick();
        this.newWalkInitialize();
    }

	/**
	 * 停止走路
	 */
	public stopWalk():void
	{
		this._walkType = 0;
		// if(!this.isPetInfo) egret.stopTick(this.render,this);
		if(!this.isPetInfo)Manager.render.remove(this.render,this);
		if(this._info instanceof PlayerGameObjectInfo && this._info.needCanYing) this._info.needCanYing = false;
        if(this._info.isingState(BodyStateManger.ISING_JUMP)) (this._info as PlayerGameObjectInfo).finishJump();
        if(this._info.isingState(BodyStateManger.ISING_SPRINT)) this._info.updateIsingState(BodyStateManger.ISING_SPRINT, false);
		if(this._info.isingState(BodyStateManger.ISING_SLIDE)) this._info.updateIsingState(BodyStateManger.ISING_SLIDE, false);
		if(this._info.isingState(BodyStateManger.ISING_KITE)) this._info.updateIsingState(BodyStateManger.ISING_KITE, false);
		if(this._info.isingState(BodyStateManger.ISING_WATER)) this._info.updateIsingState(BodyStateManger.ISING_WATER, false);
		if(this._info.getAliveFlag())
		{
			if(!FigureAction.isAttackAction(this._info.getActionStr()))
			{
				this._info.setActionStr(FigureAction.STAND);
			}
		}
		else this._info.setActionStr(FigureAction.DEAD);
	}

	protected newWalkInitialize():void
	{
		if(this._path.length <= 1)
		{
			this._info.updatePostion(this._target.x,this._target.y);
			this.walkComplete();
		}
		else
		{
			if(this._walkType == WalkType.SPRINT) 
			{
				(this._info as PlayerGameObjectInfo).needCanYing = true;
				if(this._info.isType(GameObjectType.SELF)) this._info.updateIsingState(BodyStateManger.ISING_SPRINT, true);
				this._info.setActionStr(FigureAction.JUMP);
			}
			else if(this._walkType == WalkType.WALK) this._info.setActionStr(FigureAction.WALK);
			else if(this._walkType == WalkType.SLIDE) this._info.setActionStr(FigureAction.SLIDE);
			else if(this._walkType == WalkType.KITE) this._info.setActionStr(FigureAction.KITE);
			else this._info.setActionStr(FigureAction.WATER);
			// this._info.setActionStr((this._walkType == WalkType.SPRINT) ? FigureAction.JUMP : FigureAction.WALK);
			if(this._info.x == this._path[0].x && this._info.y == this._path[0].y)this._path.shift();
			this.initSpeed(this._path.shift());
		}
	}

    protected initSpeed(finishPos:egret.Point):void
	{
		this._finishPos = finishPos;
		let dis = egret.Point.distance(new egret.Point(this._info.x,this._info.y),this._finishPos);
		let tSpeed:number;
		switch(this._walkType)
		{
			case WalkType.SPRINT:
				tSpeed = this.SPRINT_SPEED;
				break;
			case WalkType.SLIDE:
				tSpeed = this.SLIDE_SPEED;
				break;
			case WalkType.WATER:
				tSpeed = this.OVER_WATER_SPEED;
				break;
			default:
				tSpeed = this._info.attrInfo.speed;
				break;
		}
		this._totalTime = Math.round(dis / (tSpeed / 1000));
		let speed = dis / this._totalTime;
		let angle = Math.atan2(this._finishPos.y - this._info.y, this._finishPos.x - this._info.x);
		this._stepX = speed * Math.cos(angle);
		this._stepY = speed * Math.sin(angle);
		this._tempX = this._info.x;
		this._tempY = this._info.y;
		let dir = Direction.getDir(this._info.x,this._info.y,this._finishPos.x,this._finishPos.y);
		this._info.setDirection(dir);
	}

	/** 所有继承类的render都要重写，并且不能使用super.render()，因为runtime是程序运行总时间，不是帧间隔时间 */
    protected render(interval:number):boolean
    {
        // let interval:number = runTime - this._lastTickTime;
		this.renderWalk(interval);
		// this._lastTickTime = runTime;
		return false;
    }

	protected renderWalk(interval:number):void
	{
		if(this._walkType == WalkType.WALK || this._walkType == WalkType.SPRINT || this._walkType == WalkType.SLIDE
			|| this._walkType == WalkType.KITE || this._walkType == WalkType.WATER)
		{
			// this._totalTime -= Manager.global.FRAME_TIME_60;
			//40=1000/25，即帧频>=25时，走路固定时间间隔为Manager.global.FRAME_TIME_60，以便保持地图平滑移动，而如果帧频<25时，就以实际时间间隔走路，不考虑地图平滑移动了
			let spaceTime:number = (interval <= 40) ? Manager.global.FRAME_TIME : interval;
			this._totalTime -= spaceTime;
			if(this._totalTime <= 0)
			{
				this._info.updatePostion(this._finishPos.x,this._finishPos.y);
				if(this.isEnd)
				{
					this.walkComplete();
				}
				else 
				{
					this.initSpeed(this._path.shift());
				}
			}
			else
			{
				// this.walkStep(Manager.global.FRAME_TIME_60);
				this.walkStep(spaceTime);
			}
		}
	}

    /**
     * 是否终点
     */
	private get isEnd():boolean
	{
		if(this._finishPos != null && this._finishPos.equals(this._target)) return true;
		return false;
	}

	public get inMove():boolean
	{
		return (this._walkType > 0);
	}

    /**
	 * 走路完成调用 
	 */
	protected walkComplete():void
	{
		if(this._walkType == WalkType.SPRINT) 
		{
			(this._info as PlayerGameObjectInfo).needCanYing = false;
			if(this._info.isType(GameObjectType.SELF)) this._info.updateIsingState(BodyStateManger.ISING_SPRINT, false);
		}
		else if(this._walkType == WalkType.SLIDE) 
		{
			if(this._info.isType(GameObjectType.SELF)) this._info.updateIsingState(BodyStateManger.ISING_SLIDE, false);
		}
		else if(this._walkType == WalkType.KITE) 
		{
			if(this._info.isType(GameObjectType.SELF)) this._info.updateIsingState(BodyStateManger.ISING_KITE, false);
		}
		else if(this._walkType == WalkType.WATER) 
		{
			if(this._info.isType(GameObjectType.SELF)) this._info.updateIsingState(BodyStateManger.ISING_WATER, false);
		}
		else if(this._walkType == WalkType.JUMP) return;//防止滑行到跳跃点，打断跳跃
		this._walkType = 0;
		this._target = null;
		this.complete();
	}

    protected complete():void
	{
		if(this._complete != null) this._complete.call(this._completeTarget);
		// if(!this.isPetInfo) egret.stopTick(this.render,this);
		if(!this.isPetInfo)Manager.render.remove(this.render,this);
		let figure:string = this._info.getAliveFlag() ? FigureAction.STAND : FigureAction.DEAD;
        this._info.setActionStr(figure);
	}

    private walkStep(interval:number):void
	{
		let p:egret.Point = this.oneStep(interval);
		this._info.updatePostion(p.x,p.y);
	}

	private oneStep(disTimer:number):egret.Point
	{
		this._tempX += (this._stepX * disTimer);
		this._tempY += (this._stepY * disTimer);
		let p:egret.Point = new egret.Point(this._tempX,this._tempY);
		p.x = (p.x + 0.5) >> 0;
		p.y = (p.y + 0.5) >> 0;
		return p;
	}

	public cancel():void
	{
		this._walkType = 0;
		// if(!this.isPetInfo) egret.stopTick(this.render,this);
		if(!this.isPetInfo)Manager.render.remove(this.render,this);
		if(this._info.getAliveFlag())this._info.setActionStr(FigureAction.STAND);
		else this._info.setActionStr(FigureAction.DEAD);
	}

    public dispose():void
    {
        this._info = null;
		// egret.stopTick(this.render,this);
		Manager.render.remove(this.render,this);
        this._path.length = 0;
        this._path = null;
        this._target = null;
        this._complete = null;
        this._completeTarget = null;
        this._finishPos = null;
    }
}