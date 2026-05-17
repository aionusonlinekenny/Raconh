class PlayerAnimation extends ShowAnimation
{
	private _playerGameObjectInfo:PlayerGameObjectInfo;
	private _jumpCanYingFlag:number;

	private _weapon:AnimationLayer;
	private _currentWeapon:number;//id
	private _currentLoadingWeapon:PathInfo;
	private _isChangeWeapon:boolean;
	
	private _weaponEffect:AnimationLayer;
	private _currentWeaponEffect:number;//刀光类型，有刀光时值对应为职业，没有刀光值为0
	private _currentLoadingWeaponEffect:PathInfo;
	private _isChangeWeaponEffect:boolean;

	private _wing:AnimationLayer;
	private _currentWing:number;//id
	private _currentLoadingWing:PathInfo;
	private _isChangeWing:boolean;

	private _weaponEffectFrames:number[];//刀光关键帧数组

	public constructor()
	{
		super();
	}

	public reuse(info:PlayerGameObjectInfo):void
	{
		this._playerGameObjectInfo = info;
		this._jumpCanYingFlag = 0;

		this._currentWeapon = -1;
		this._currentLoadingWeapon = null;
		this._isChangeWeapon = false;

		this._currentWeaponEffect = 0;
		this._currentLoadingWeaponEffect = null;
		this._isChangeWeaponEffect = false;

		this._currentWing = -1;
		this._currentLoadingWing = null;
		this._isChangeWing = false;

		this._weapon = Manager.pool.create(AnimationLayer,true);
		this._weaponEffect = Manager.pool.create(AnimationLayer,false);
		this._wing = Manager.pool.create(AnimationLayer,true);
		super.reuse(info);
	}

	public unuse():void
	{
		super.unuse();
		this.removeLoad(this._currentLoadingWing, this.wingComplete);
		this.removeLoad(this._currentLoadingWeapon, this.weaponComplete);
		this.removeLoad(this._currentLoadingWeaponEffect, this.weaponEffectComplete);
		Manager.pool.push(this._weapon);
		this._weapon = null;
		Manager.pool.push(this._weaponEffect);
		this._weaponEffect = null;
		Manager.pool.push(this._wing);
		this._wing = null;
		this._weaponEffectFrames = null;
		this._playerGameObjectInfo = null;
	}

	public set currentClothes(aniID:number)
	{
		let change:boolean = false;
		if(this._currentClothes != aniID)
		{
			this._currentClothes = aniID;
			let clothesGroupName:string = this.getClothesGroupName();
			let path:PathInfo = Manager.path.getClothesPath(clothesGroupName);
			change = (this._currentLoadingClothes != path);
		}
		this._isChangeClothes = change || this._updateDirection || this._updateAction;
	}

	private set currentWeapon(aniID:number)
	{
		let change:boolean = false;
		if(this._currentWeapon != aniID)
		{
			this._currentWeapon = aniID;
			let weaponGroupName:string = this.getWeaponGroupName();
			let path:PathInfo;
			if(weaponGroupName != "") path = Manager.path.getWeaponPath(weaponGroupName);
			change = (this._currentLoadingWeapon != path);
			this.weaponEffect();
		}
		this._isChangeWeapon = change || this._updateDirection || this._updateAction;
	}

	private set currentWeaponEffect(type:number)
	{
		let change:boolean = false;
		if(this._currentWeaponEffect != type)
		{
			this._currentWeaponEffect = type;
			let weaponEffectGroupName:string = this.getWeaponEffectGroupName();
			let path:PathInfo = Manager.path.getWeaponEffectPath(weaponEffectGroupName);
			change = (this._currentLoadingWeaponEffect != path);
		}
		this._isChangeWeaponEffect = change || this._updateDirection || this._updateAction;
	}

	public set currentWing(aniID:number)
	{
		let change:boolean = false;
		if(this._currentWing != aniID)
		{
			this._currentWing = aniID;
			let wingGroupName:string = this.getWingGroupName();
			let path:PathInfo;
			if(wingGroupName != "") path = Manager.path.getWingPath(wingGroupName);
			change = (this._currentLoadingWing != path);
		}
		this._isChangeWing = change || this._updateDirection || this._updateAction;
	}

	private cancelWeapon():void
	{
		if(this._currentLoadingWeapon != null)
		{
			this.cancelLoadCompleteCall(this._weapon, this._currentLoadingWeapon, this.weaponComplete);
			this._currentLoadingWeapon = null;
		}
	}
	
	private cancelWeaponEffect():void
	{
		if(this._currentLoadingWeaponEffect != null)
		{
			this._weaponEffect.clear();
			this.cancelLoadCompleteCall(this._weaponEffect, this._currentLoadingWeaponEffect, this.weaponEffectComplete);
			this._currentLoadingWeaponEffect = null;
		}
	}

	private cancelWing():void
	{
		if(this._currentLoadingWing != null)
		{
			this.cancelLoadCompleteCall(this._wing, this._currentLoadingWing, this.wingComplete);
			this._currentLoadingWing = null;
		}
	}

	protected updateClothes():void
	{
		super.updateClothes();
		let clothesGroupName:string = this.getClothesGroupName();
		let path:PathInfo = Manager.path.getClothesPath(clothesGroupName);
		if(this._info instanceof SelfGameObjectInfo)Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
		else Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
		this._currentLoadingClothes = path;
	}

	private updateWeapon():void
	{
		this.cancelWeapon();
		if(this._currentWeapon == 0)
		{
			if(this._weapon.parent != null) this._container.removeChild(this._weapon);
		}
		else
		{
			if(this._weapon.parent == null) this._container.addChild(this._weapon);
			let weaponGroupName:string = this.getWeaponGroupName();
        	let path:PathInfo = Manager.path.getWeaponPath(weaponGroupName);
			if(weaponGroupName != "")
			{
				if(this._info instanceof SelfGameObjectInfo)Manager.loader.load(path, this.weaponComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
				else Manager.loader.load(path, this.weaponComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
			}
			this._currentLoadingWeapon = path;
		}	
	}

	private updateWeaponEffect():void
	{
		this.cancelWeaponEffect();
		if(this._currentWeaponEffect == 0)
		{
			if(this._weaponEffect.parent != null) this._container.removeChild(this._weaponEffect);
		}
		else
		{
			if(this._weaponEffect.parent == null) this._container.addChild(this._weaponEffect);
			let weaponEffectGroupName:string = this.getWeaponEffectGroupName();
        	let path:PathInfo = Manager.path.getWeaponEffectPath(weaponEffectGroupName);
			if(this._info instanceof SelfGameObjectInfo)Manager.loader.load(path, this.weaponEffectComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
			else Manager.loader.load(path, this.weaponEffectComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
			this._currentLoadingWeaponEffect = path;
		}	
	}

	private updateWing():void
	{
		this.cancelWing();
		if(this._currentWing == 0)
		{
			if(this._wing.parent != null) this._container.removeChild(this._wing);
		}
		else
		{
			if(this._wing.parent == null)
			{
				this._container.addChild(this._wing);
				if(this._weapon && this._weapon.parent != null) this._container.addChild(this._weapon);//确保武器在最上层
			}
			let wingGroupName:string = this.getWingGroupName();
        	let path:PathInfo = Manager.path.getWingPath(wingGroupName);
			if(wingGroupName != "")
			{
				if(this._info instanceof SelfGameObjectInfo)Manager.loader.load(path, this.wingComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
				else Manager.loader.load(path, this.wingComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
			}
			this._currentLoadingWing = path;
		}	
	}

	protected weaponComplete(loader:Loader):void
	{
		this.loadAnimationComplete(this._weapon, loader);
	}
		
	private weaponEffectComplete(loader:Loader):void
	{
		this.loadAnimationComplete(this._weaponEffect, loader);
	}

	protected wingComplete(loader:Loader):void
	{
		this.loadAnimationComplete(this._wing, loader);
	}

	protected cancel():void
	{
		this.cancelWeapon();
		this.cancelWeaponEffect();
		this.cancelWing();
		super.cancel();
	}

	public updateStyle():void
	{
		this.clothes();
		this.weapon();
		this.weaponEffect();
		this.wing();
	}

	protected updateKeyFrame():void
	{
        let that = this;
		super.updateKeyFrame();
		if(FigureAction.isAttackAction(that._currentAction))
		{
			let index:number = that._weaponEffectFrames.indexOf(that._currentFrame);
			if(index != -1)
			{
				that.updateAnimationLayer(index, that._weaponEffect);
			}
		}
	}

	private clothes():void
	{
		this.currentClothes = this._playerGameObjectInfo.hasBianID ? this._playerGameObjectInfo.bianID : this._playerGameObjectInfo.clothes;
	}

	private weapon():void
	{
		if(this._currentAction == FigureAction.SLIDE) this.currentWeapon = 0;
		else this.currentWeapon = this._playerGameObjectInfo.hasBianID ? 0 : this._playerGameObjectInfo.weapon;
	}

	protected weaponEffect():void
	{
		if(FigureAction.isAttackAction(this._currentAction) && !this._playerGameObjectInfo.hasBianID)
		{
			this.currentWeaponEffect = this._playerGameObjectInfo.attrInfo.career;
		}
		else this.currentWeaponEffect = 0;
	}

	private wing():void
	{
		this.currentWing = this._playerGameObjectInfo.hasBianID ? 0 : this._playerGameObjectInfo.wing;
	}

	public dead():void
	{
		
	}

	protected setFrames(action:string):void
	{
		switch(action)
        {
            case FigureAction.WALK:
                this._frames = [1,5,9,13,17,21];
				this._totalFrame = 24;
				break;
            case FigureAction.STAND:
			case FigureAction.KITE:
                this._frames = [1,7,13,19];
				this._totalFrame = 24;
				break;
            case FigureAction.ATTACK1:
                this._frames = [1,4,8,11,15];
				this._totalFrame = 18;
				this._weaponEffectFrames = [8,11,15];
				break;
            case FigureAction.ATTACK2:
                this._frames = [1,4,7,9,11,13,16,19];
				this._totalFrame = 21;
				this._weaponEffectFrames = [4,7,9,11,13,16,19];
				break;
            case FigureAction.ATTACK3:
                this._frames = [1,4,7,10,13,17];
				this._totalFrame = 20;
				this._weaponEffectFrames = [4,7,10,13,17];
				break;
            case FigureAction.JUMP:
			case FigureAction.WATER:
                this._frames = [1];
				this._totalFrame = 1;
				break;
            case FigureAction.DEAD:
                this._frames = [1];
				this._totalFrame = 1;
				break;
			case FigureAction.SIT:
			case FigureAction.SLIDE:
				this._frames = [1,7,13,19];
				this._totalFrame = 24;
				break;
        }
	}

	protected getClothesGroupName():string
	{
		if(this._currentAction == FigureAction.DEAD) return "body"+this._currentClothes+"_3_d";
		else if(this._currentAction == FigureAction.SIT)
		{
			let clothesID:number;
			if(this._playerGameObjectInfo.attrInfo.career == 1)
				clothesID = 1001;
			else
				clothesID = 2001;
			return "body"+clothesID+"_"+Direction.getResGroupShortName(this._currentDirection)+"_"+FigureAction.getResGroupShortName(this._currentAction);
		}
		else
			return "body"+this._currentClothes+"_"+Direction.getResGroupShortName(this._currentDirection)+"_"+FigureAction.getResGroupShortName(this._currentAction);
	}

	protected getWeaponGroupName():string
	{
		if(this._currentAction == FigureAction.DEAD) return "weapon"+this._currentWeapon+"_3_d";
		else if(this._currentAction == FigureAction.SIT) return "";
		else return "weapon"+this._currentWeapon+"_"+Direction.getResGroupShortName(this._currentDirection)+"_"+FigureAction.getResGroupShortName(this._currentAction);
	}

	protected getWeaponEffectGroupName():string
	{
		return "skillweapon_"+Direction.getResGroupShortName(this._currentDirection)+"_"+FigureAction.getResGroupShortName(this._currentAction);
	}

	protected getWingGroupName():string
	{
		if(this._currentAction == FigureAction.DEAD) return "wing"+this._currentWing+"_3_d";
		else if(this._currentAction == FigureAction.SIT) return "";
		else return "wing"+this._currentWing+"_"+Direction.getResGroupShortName(this._currentDirection)+"_"+FigureAction.getResGroupShortName(this._currentAction);
	}

	protected render(interval:number):void
	{
        let that = this;
		if(that._frames != null && that.hasGhost() || that._playerGameObjectInfo.needCanYing) that.updateGhost();
		if(that._isChangeStyle)
		{
			that.updateStyle();
			that._isChangeStyle = false;
		}
		if(that._isChangeWeapon)
		{
			that._isChangeWeapon = false;
			that.updateWeapon();
		}
		if(that._isChangeWeaponEffect)
		{
			that._isChangeWeaponEffect = false;
			that.updateWeaponEffect();
		}
		if(that._isChangeWing)
		{
			that._isChangeWing = false;
			that.updateWing();
		}
		super.render(interval);
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
					that._currentTimer = 0;
					that._currentFrame = 1;
					that.onceDefault();
					break;
				case WrapMode.ATTACK:
					that._currentTimer = 0;
					that._currentFrame = 1;
					if(that._info instanceof SelfGameObjectInfo)
					{
						if(that._info.target == null) that.onceDefault();
						else that._info.playRandomAttack();
					}
					else if((that._info instanceof PlayerGameObjectInfo) && that._info.isSceneRobot)
					{
						//机器人循环播放攻击动作
						that._info.playRandomAttack();
						that.figureAction = that._info.getActionStr();//机器人没有对应的PlayerGameObject，所以此处直接更改PlayerAnimation的figureAction属性
					}
					break;
				default:
					that._currentTimer = 0;
					that._currentFrame = 1;
					break;
			}
		}
	}
		
	protected updateGhost():void
	{
        let that = this;
		that._jumpCanYingFlag ++;
		if(that._jumpCanYingFlag >= 3)
		{
			that._jumpCanYingFlag = 0;
			if(that._playerGameObjectInfo != null && that._playerGameObjectInfo.needCanYing)
			{
				that.addGhost(that._clothes, that._playerGameObjectInfo.x, that._playerGameObjectInfo.y);
			}
		}
		super.updateGhost();
	}

	public dispose():void
	{
		super.dispose();
		Manager.pool.push(this._weapon);
		this._weapon = null;
		Manager.pool.push(this._weaponEffect);
		this._weaponEffect = null;
		Manager.pool.push(this._wing);
		this._wing = null;
		this._weaponEffectFrames = null;
		this._playerGameObjectInfo = null;
	}
}