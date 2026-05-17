class ShowAnimation extends egret.DisplayObjectContainer implements IAnimation,cw.IPool
{
	protected _layers:AnimationLayer[];
	protected _pause:boolean;
	protected _totalTimer:number;
	protected _currentTimer:number;
	protected _updateDirection:boolean;
	protected _currentDirection:string;
	protected _updateAction:boolean;
	protected _currentAction:string;
	protected _currentFrame:number;
	protected _nextFrame:number;
	protected _totalFrame:number;
	protected _info:IAnimationInfo;
	protected _frames:number[];//关键帧数组
	protected _isChangeClothes:boolean;
	protected _clothes:AnimationLayer;
	protected _container:egret.DisplayObjectContainer;
	protected _isChangeStyle:boolean;
	protected _isClearCurrent:boolean;
	protected _currentClothes:number;//id
	protected _currentLoadingClothes:PathInfo;
	private _ghosts:egret.Bitmap[];
	
	public constructor()
	{
		super();
	}

	public reuse(info:IAnimationInfo):void
	{
		this._layers = [];
		this._totalTimer = 0;
		this._nextFrame = 10000;
		this._currentAction = FigureAction.STAND;
		this._currentDirection = Direction.DOWN;
		this._currentFrame = 1;
		this._info = info;
		this._pause = false;
		this._isClearCurrent = true;
		this._updateDirection = true;
		this._updateAction = true;
		this._isChangeStyle = true;
		this._isChangeClothes = false;
		this._currentClothes = -1;
		this._currentLoadingClothes = null;
		
		this._container = Manager.pool.create(egret.DisplayObjectContainer);
		this.addChild(this._container);

		this._clothes = Manager.pool.create(AnimationLayer);
		this._container.addChild(this._clothes);
		this.setFrames(this._currentAction);
		this.resetTimer();

		this.addEvent();
	}

	public unuse():void
	{
		if(this.parent != null)this.parent.removeChild(this);
		this.removeLoad(this._currentLoadingClothes, this.clothesComplete);
		this.removeEvent();
		this.filters = null;
		this._layers = null;
		this._pause = false;
		this._totalTimer = 0;
		this._currentTimer = 0;
		this._updateDirection = false;
		this._updateAction = false;
		this._currentAction = "";
		this._currentFrame = 0;
		this._nextFrame = 0;
		this._totalFrame = 0;
		this._info = null;
		this._frames = null;
		this._isChangeClothes = false;
		this._isChangeStyle = false;
		this._isClearCurrent = false;
		this._currentClothes = -1;
		this._currentLoadingClothes = null;
		Manager.pool.push(this._clothes);
		this._clothes = null;
		Manager.pool.push(this._container);
		this._container = null;
		if(this._ghosts != null)
		{
			for(let i:number = 0; i < this._ghosts.length; i++)
			{
				Manager.pool.push(this._ghosts[i]);
			}
			this._ghosts = null;
		}
		this.x = 0;
		this.y = 0;
	}

	protected addEvent():void
	{
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
	}

	protected removeEvent():void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
	}

	protected __addedToStage(e:egret.Event):void
	{
		Manager.render.add(this.render, this);
		this._isChangeStyle = true;
	}

	protected __removeFromStage(e:egret.Event):void
	{
		Manager.render.remove(this.render, this);
	}

	public set figureDirection(direction:string)
	{
		if(this._currentDirection != direction)
		{
			if(this._currentDirection.replace("left","right") != direction.replace("left","right")) 
				this._isChangeStyle = (this._currentDirection != direction);
			this._currentDirection = direction;
			this._isClearCurrent = this._isChangeStyle;
			this._updateDirection = true;
		}
	}

	public set figureAction(action:string)
	{
		if(this._currentAction != action)
		{
			this._currentAction = action;
			this._isChangeStyle = true;
			this._updateAction = true;
			this._isClearCurrent = true;
			this._currentFrame = 1;
			this._pause = false;
			this.setFrames(this._currentAction);
			this.resetTimer();
		}
	}
	
	public set currentClothes(aniID:number)
	{
		throw new Error("子类需重写");
	}

	protected setFrames(action:string):void
	{
		throw new Error("子类需重写");
	}

	public updateStyle():void
	{
		throw new Error("子类需重写");
	}

	protected switchInitFrameLabel():void
	{
		
	}

	protected resetTimer():void
	{
		this._currentTimer = 0;
		this._totalTimer = this._totalFrame * Manager.global.FRAME_TIME;
	}

	protected cancelClothes():void
	{
		if(this._currentLoadingClothes != null)
		{
			this.cancelLoadCompleteCall(this._clothes, this._currentLoadingClothes, this.clothesComplete);
			this._currentLoadingClothes = null;
		}
	}

	protected updateClothes():void
	{
		this.cancelClothes();
	}

	protected cancel():void
	{
		this.cancelClothes();
	}

	protected addLayer(layer:AnimationLayer):void
	{
		if(this.hasLayer(layer)) return;
		this._layers.push(layer);
	}

	protected hasLayer(layer:AnimationLayer):boolean
	{
		if(!this._layers || !layer) return false;
		return (this._layers.indexOf(layer) != -1);
	}

	protected removeLayer(layer:AnimationLayer):void
	{
		let index:number = this._layers.indexOf(layer);
		if(index != -1) this._layers.splice(index, 1);
	}

	protected render(interval:number):void
	{
        let that = this;
		if(that._isChangeClothes)
		{
			that._isChangeClothes = false;
			that.updateClothes();
		}
		if(that._isClearCurrent) that._isClearCurrent = false;
		if(that._updateDirection)
		{
			that._container.scaleX = (that._currentDirection.indexOf("left") == 0) ? -1 : 1;
			that._updateDirection = false;
		}
		if(that._pause || that._frames == null) return;
		that.updateKeyFrame();
		that._currentTimer += Math.max(interval, Manager.global.FRAME_TIME);
		that._currentFrame = Math.ceil(that._currentTimer / Manager.global.ANI_INTERVAL);//Math.ceil(that._currentTimer / Manager.global.FRAME_TIME);
		if(that._currentFrame > that._nextFrame) that._currentFrame = that._nextFrame;
		that.renderCurrentFrame();
	}

	/**
	 * 更新关键帧 
	 */
	protected updateKeyFrame():void
	{
        let that = this;
		let index:number = that._frames.indexOf(that._currentFrame);
		if(index != -1)
		{
			that._nextFrame = ((index + 1) >= that._frames.length) ? 10000 : that._frames[index + 1];
			for(let i:number = 0; i < that._layers.length; i++)
			{
				if(that._layers[i].isNormal) that.updateAnimationLayer(index, that._layers[i]);
			}
		}
	}

	protected renderCurrentFrame():void
	{
        let that = this;
		if(that._currentFrame > that._totalFrame)
		{
			let wrapmode:number = FigureAction.getWrapMode(that._currentAction);
			switch(wrapmode)
			{
				case WrapMode.ONCE:
					that._pause = true;
					break;
				case WrapMode.ONCE_DEFAULT:
				case WrapMode.ATTACK:
					that._currentTimer = 0;
					that._currentFrame = 1;
					if(!that._info.isSceneRobot) that.onceDefault();
					break;
				default:
					that._currentTimer = 0;
					that._currentFrame = 1;
					break;
			}
		}
	}

	protected onceDefault():void
	{
		this._info.setActionStr(FigureAction.STAND);
	}

	protected updateAnimationLayer(index:number, layer:AnimationLayer):void
	{
		layer.updateFrame(index+1);
	}

	protected cancelLoadCompleteCall(layer:AnimationLayer, current:PathInfo, call:Function):void
	{
		if(this._isClearCurrent)
		{
			layer.clear();
		}
		this.removeLayer(layer);
		this.removeLoad(current, call);
	}

	protected removeLoad(current:PathInfo, call:Function):void
	{
		if(current != null)
		{
			Manager.loader.remove(current, call, this);
		}
	}

	protected initData(layer:AnimationLayer, loader:Loader):void
	{
		layer.setLoadData(loader);
		if(this._pause)
		{
			// let index = this._frames[this._frames.length - 1];
			let index = this._frames.length - 1;
			this.updateAnimationLayer(index, layer);
		}
	}

	protected clothesComplete(loader:Loader):void
	{
		this.loadAnimationComplete(this._clothes, loader);
	}

	protected loadAnimationComplete(layer:AnimationLayer, loader:Loader):void
	{
		this.initData(layer, loader);
		this.addLayer(layer);
	}

	protected updateGhost():void
	{
		if(this._ghosts == null) return;
		for(let i:number = this._ghosts.length - 1; i >= 0; i--)
		{
			this._ghosts[i].alpha -=0.04;
			if(this._ghosts[i].alpha <= 0)
			{
				Manager.pool.push(this._ghosts[i]);
				this._ghosts.splice(i,1);
			}
		}
	}

	protected addGhost(bitmap:egret.Bitmap, posx:number, posy:number):void
	{
		var ghost:egret.Bitmap = Manager.pool.create(egret.Bitmap);
		ghost.alpha = 0.65;
        ghost.texture = bitmap.texture;
        ghost.scaleX = this._container.scaleX;
		ghost.x = posx + bitmap.x * this._container.scaleX;
		ghost.y = posy + bitmap.y;
		Manager.layer.elementLayer2.addChild(ghost);
		if(this._ghosts == null) this._ghosts = [];
		this._ghosts.push(ghost);
	}

	protected hasGhost():boolean
	{
		return this._ghosts != null &&　this._ghosts.length > 0;
	}

	public dispose():void
	{
		if(this.parent != null)this.parent.removeChild(this);
		this.cancel();
		Manager.pool.push(this._clothes);
		this._clothes = null;
		Manager.pool.push(this._container);
		this._container = null;
		if(this._ghosts != null)
		{
			for(let i:number = 0; i < this._ghosts.length; i++)
			{
				Manager.pool.push(this._ghosts[i]);
			}
			this._ghosts = null;
		}
		this._info = null;
		this._layers = null;
		this._currentLoadingClothes = null;
	}
}