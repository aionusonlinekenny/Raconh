/**
 *人物视图信息类
 * Anydo
 * create  
 * update devil 2017-11-08
*/
class SelfGameObjectInfo extends PlayerGameObjectInfo
{
	private _target:GameObjectInfo;
	public get target():GameObjectInfo
	{
		 return this._target; 
	}

	public reuse(id:number,role:RoleInfo):void
	{
		super.reuse(id,role);
	}

	public remove(onlyView:boolean,isImmediately:boolean = true):void
	{
		super.remove(onlyView,isImmediately);
	}

	public unuse():void
	{
		super.unuse();
		this._target = null;
	}

	public getType():number
	{
		return GameObjectType.SELF;
	}

	public get isSelfGO():boolean{ return true; }

	public get index9():egret.Point
	{
		return this._index9;
	}
	public set index9(value:egret.Point)
	{
		if(this._index9.equals(value)) return;
		this._index9 = value;
		this.dispatchEvent(new GameObjectEvent(GameObjectEvent.GO_INDEX9));
	}

	public canHit(showMsg:boolean, useCommonCD:boolean=true):boolean
	{
		if(useCommonCD && !Manager.model.getSkill().canHitByCommonCD()) 
		{
			return false;
		}
		if(!this.can(CanType.CAN_HIT, showMsg)) return false;
		return true;
	}

	public canHited(showMsg:boolean):boolean
	{
		 return false; 
	}

	public attrUpdateBlood(oldValue:number):void
	{
		if((this.attrInfo.hp > oldValue) && (oldValue > 0)) this.playSCT(SCTConst.TYPE_BLOOD, this.attrInfo.hp - oldValue, 0);
		super.attrUpdateBlood(oldValue);
	}

	public setAliveFlag(value:boolean):void
	{
		super.setAliveFlag(value);
		if(!this._aliveFlag)
		{
			this.updateTarget(null);
			this.clearFollowTarget();
		}
		else
		{
			this.updateIsingState(BodyStateManger.ISING_JUMP,false);
			this.updateIsingState(BodyStateManger.ISING_SPRINT,false);
			this.updateIsingState(BodyStateManger.ISING_SLIDE,false);
			this.updateIsingState(BodyStateManger.ISING_KITE,false);
			this.updateIsingState(BodyStateManger.ISING_WATER,false);
		}
	}

	private clearFollowTarget():void
	{
		if(this.selfPet) 
		{
			this.selfPet.updateTarget(null);
		}
	}

	public updatePostion(x:number, y:number,isForce:boolean = false):void
    {
        if(this.x == x && this.y == y && !isForce) return;
        let oldPos:egret.Point = new egret.Point(this.x, this.y);
		super.updatePostion(x, y, isForce);
		Manager.model.getGameobject().checkJumpPointTrigger();
		this.checkSelfPosSync(oldPos);
		this.dispatchEvent(new GameObjectEvent(GameObjectEvent.GO_POSITION));
    }

    private checkSelfPosSync(oldPos:egret.Point):void
    {
        //野外地图(单人)，九宫格改变同步位置；多人地图，小格子改变同步位置
        let oldIndex:egret.Point;
        let noChange:boolean = true;
        if(Manager.model.getMap().mapCVO.isFieldMap)
        {
            oldIndex = IndexUtil.getIndex9ByXY(oldPos.x, oldPos.y);
            noChange = this.index9.equals(oldIndex);
        }
        else
        {
            oldIndex = IndexUtil.getIndexByXY(oldPos.x, oldPos.y);
            noChange = this._indexes.equals(oldIndex);
        }
        if(!noChange) Manager.control.getMap().cmdSelfWalkPosSync(this.x, this.y);
    }

	public updateTarget(value:GameObjectInfo):void
	{
		let lastTarget:GameObjectInfo = this._target;
		this._target = value;
		if(this._view != null)(this._view as SelfGameObject).eventTarget();


		if(lastTarget == this._target) return;
		let mapCVO:MapCVO = Manager.model.getMap().mapCVO;
		if(mapCVO && mapCVO.type == MapConst.TYPE_BOSS)//暂需求，只在boss地图里做这个处理
		{
			let bossStrip:BossBloodStrip2 = Manager.view.getView(ViewID.BossBloodStrip) as BossBloodStrip2;
			if(this._target && this._target instanceof PlayerGameObjectInfo) 
			{
				Manager.view.show(ViewID.PlayerBloodStrip, this._target);
				if(bossStrip)bossStrip.setVisible(false);
				// ObjectUtil.remove(bossStrip);
				// if(bossStrip)Manager.view.hide(ViewID.BossBloodStrip);
			}
			else
			{
				Manager.view.hide(ViewID.PlayerBloodStrip);
				// if(bossStrip) Manager.layer.uiLayer_home.addChildAt(bossStrip, 0);
				// if(!bossStrip)Manager.view.show(ViewID.BossBloodStrip,this._target as MonsterGameObjectInfo)
				if(bossStrip)bossStrip.setVisible(true);
			}
		}
	}

	public cancelAction():void
	{
		if(this._view != null)(this._view as SelfGameObject).eventCancelAction();
		// Manager.control.getMap().cmdPlayerWalk([new egret.Point(this.x, this.y)], WalkType.WALK);
	}
		
	public get selfPet():SelfPetGameObjectInfo
	{
		return this._pet as SelfPetGameObjectInfo;
	}
	
	public setPet(value:PetGameObjectInfo):void
	{
		if(this._pet == value)return;
		if(value != null)
		{
			let petPos:egret.Point = GameUtil.getNearCanWalkRandomPos(this.x, this.y);
			value.updatePostion(petPos.x, petPos.y);
		}
		super.setPet(value);
	}

	public dispatchJump(targets:egret.Point[], complete?:Function):void
	{
		if(this._view != null) (this._view as SelfGameObject).eventJump(targets, complete);
	}

	/*能否参与活动、副本或战场
	* showTips 是否提示
	*/
	public canJoinActive(showTips:boolean = false):boolean
	{
		if(this.attrInfo.bfType == BFType.COPY)
		{
			if(showTips) FloatTips.addTips(LangCVO.getContent("common27"));//正在副本中，请退出副本后进行操作
			return false;
		}
		if(this.attrInfo.bfType == BFType.BOSS_PRIVATE || this.attrInfo.bfType == BFType.BOSS_PUBLIC)
		{
			if(showTips) FloatTips.addTips(LangCVO.getContent("common28"));//正在BOSS中，请退出BOSS后进行操作
			return false;
		}
		if(this.attrInfo.bfType == BFType.ARENA)
		{
			if(showTips) FloatTips.addTips(LangCVO.getContent("common36"));//正在个人竞技中，请退出个人竞技后进行操作
			return false;
		}
		if(this.attrInfo.bfType == BFType.CLUB_BF || this.attrInfo.bfType == BFType.CLUB_BF_1V1 || this.attrInfo.bfType == BFType.CLUB_BF_BOSS)
		{
			if(showTips) FloatTips.addTips(LangCVO.getContent("common42"));//正在盟会战中，请退出盟会战后进行操作
			return false;
		}
		return true;
	}

	public enterMap():void
	{
		this.stopWalk();
		this.needCanYing = false;
		this.updateIsingState(BodyStateManger.ISING_JUMP, false);
		this.updateIsingState(BodyStateManger.ISING_SPRINT, false);
		this.updateIsingState(BodyStateManger.ISING_SLIDE,false);
		this.updateIsingState(BodyStateManger.ISING_KITE,false);
		this.updateIsingState(BodyStateManger.ISING_WATER,false);
		if(this._view != null) (this._view as SelfGameObject).eventAliveFlag();
	}

	public isIn9Scale(info:GameObjectInfo,dis:number = 1):boolean
	{
		return (Math.abs(this._index9.x - info.index9.x) <= dis && Math.abs(this._index9.y - info.index9.y) <= dis)
	}

	public get targetShowHalfWidth():number
	{
		if(this._target instanceof MonsterGameObjectInfo) 
		{
			return (this._target as MonsterGameObjectInfo).cvo.showHalfWidth;
		}
		return 0;
	}
	
	public isInAttackRect(showMsg:boolean = false, target?:GameObjectInfo):boolean
	{
		if(this._target == null) return false;
		let currentSkill:SkillInfo = Manager.model.getSkill().currentSkill;
		if(currentSkill == null) return false;
		let dis:number = egret.Point.distance(new egret.Point(this.x,this.y), (target == null) ? new egret.Point(this._target.x,this._target.y) : new egret.Point(target.x,target.y));
		if(dis <= (currentSkill.cvo.maxRange + this.targetShowHalfWidth)) return true;
		return false;
	}
		
	public createGameObject():SelfGameObject
	{
		if(this._view == null)this._view = Manager.pool.create(SelfGameObject,this);
		return this._view as SelfGameObject;
	}

	private _collectionInfoCallBack:Function;
	private _collectionInfoTarget:any;
	public collect(collectionInfo:GameObjectInfo, callback:Function,target:any):void
	{
		if(collectionInfo == null) return;
		this._collectionInfoCallBack = callback;
		this._collectionInfoTarget = target;
		let dis:number = egret.Point.distance(new egret.Point(this.x,this.y), new egret.Point(collectionInfo.x, collectionInfo.y));
		if(dis > 200)
		{
			if(this._view != null)
			{
				(this._view as AliveGameObject).eventWalk([new egret.Point(this.x,this.y), new egret.Point(collectionInfo.x, collectionInfo.y)], 1,this.gotoCollectionComplete,this);
			}
		}
		else
		{
			this.gotoCollectionComplete();
		}
	}

	private gotoCollectionComplete():void
	{
		// this.updateStyle(1001, 0, 0);
		Manager.model.self.updateIsingState(BodyStateManger.ISING_COLLECT, true);
		Manager.view.show(ViewID.CollectEffect, "caiji", this._collectionInfoCallBack,this._collectionInfoTarget);
		this._collectionInfoTarget = null;
		this._collectionInfoCallBack = null;
	}
	
	public dispose():void
	{
		super.dispose();
		this._target = null;
	}
}