/**
 *生命对象视图信息类
 * Anydo
 * create  
 * update devil 2017-11-07
*/
class AliveGameObjectInfo extends GameObjectInfo implements ITarget,IAnimationInfo
{
	private _direction:string;
	public getDirection():string
	{
		return this._direction; 
	} 
	public setDirection(value:string):void
	{
		if(this._direction == value) return;
		this._direction = value;
		if(this._view != null)(this._view as AliveGameObject).eventDirection();
	}
	
	protected _actionStr:string;
	public getActionStr():string
	{
		 return this._actionStr;
	}
	public setActionStr(value:string):void
	{
		if(this._actionStr == value)return;
		this._actionStr = value;
		if(this._view != null)(this._view as AliveGameObject).eventAction();
	}

	protected _aliveFlag:boolean;
	public getAliveFlag():boolean
	{
		 return this._aliveFlag;
	}
	public setAliveFlag(value:boolean):void
	{
		if(this._aliveFlag == value) return;
		this._aliveFlag = value;
		if(this._view != null)(this._view as AliveGameObject).eventAliveFlag();
	}

	private _battleFlag:boolean;
	public getBattleFlag():boolean
	{
		 return this._battleFlag;
	}
	public setBattleFlag(value:boolean):void
	{
		this._battleFlag = value;
		if(this._battleFlag)
		{
			//脱战10秒后变成非战斗状态（by伦榛）
			Manager.render.add(this.cancelBattleFlag, this, 10000, 1, null, true);
		}
		else Manager.render.remove(this.cancelBattleFlag, this);
		if(this._view != null)(this._view as AliveGameObject).eventBattleFlag();
	}
	private cancelBattleFlag():void
	{
		this.setBattleFlag(false);
	}

	/** 变身ID */
	public bianID:number;

	public get hasBianID():boolean{ return (this.bianID > 0); }

	public isSceneRobot:boolean;

	public getBlood():number
	{
		 return this.attrInfo.hp; 
	}
	
	//记录攻击者的ID，用于挂机寻挂的时候，玩家都打同一个怪
	public attackID:number;
	public attrInfo:GameObjectAttrInfo;

	public canHited(showMsg:boolean=true):boolean
	{
		 return false; 
	}

	protected _buffLst:BuffCVO[];
	public get buffLst():BuffCVO[]{return this._buffLst;}

	protected _buffState:number;
	protected _isingState:number;

	private _tempTimeHitedWhite:number;
	private _colorFilterPriority:number;
	private _colorFilterType:number;
	public getColorFilterType():number{ return this._colorFilterType; }
	/**
	 * 设置滤镜变色 type=0取消变色
	 */
	public setColorFilter(type:number, priority:number=0):boolean
	{
		let isClear:boolean = (type == 0 && priority == 0);
		if(!isClear && (priority < this._colorFilterPriority)) return false;
		egret.clearTimeout(this._tempTimeHitedWhite);
		this._colorFilterType = type;
		this._colorFilterPriority = priority;
		if(this._view != null) (this._view as AliveGameObject).eventColorFilter();
		return true;
	}

	public setHitedWhiteFilter():void
	{
		let success:boolean = this.setColorFilter(ColorFilterType.WHITE, 0);
		if(success)
		{
			egret.clearTimeout(this._tempTimeHitedWhite);
			this._tempTimeHitedWhite = egret.setTimeout(this.resetHitedWhiteFilter, this, 200);
		}
	}

	protected resetHitedWhiteFilter():void
	{
		this.setColorFilter(ColorFilterType.EMPTY, 0);
	}
	
	public get isPlayer():boolean
	{
		return GameObjectType.isPlayer(this.getType());
	}

	/** 自己或者自己的宠物 */
	public get isSelfGO():boolean
	{
		 return false;
	}
	
	public getAnimationType():number
	{
		 return AnimationType.EMPTY; 
	}

	protected start():void
	{
		super.start();
		this._direction = Direction.RIGHT_DOWN;
		this._actionStr = FigureAction.STAND;
		this._aliveFlag = true;
		this._battleFlag = false;
		this._buffLst = [];
		this.bianID = 0;
		this.attackID = 0;
		this._colorFilterType = 0;
		this._colorFilterPriority = 0;
		this.isSceneRobot = false;
		this.attrInfo = Manager.pool.create(GameObjectAttrInfo, this);
	}

	public unuse():void
	{
		egret.clearTimeout(this._tempTimeHitedWhite);
		Manager.pool.push(this.attrInfo);
		this.attrInfo = null;
		this._buffLst = null;
		this.bianID = 0;
		this.attackID = 0;
		this._colorFilterType = 0;
		this._colorFilterPriority = 0;
		this.isSceneRobot = false;
		Manager.render.remove(this.cancelBattleFlag, this);
		super.unuse();
	}

	public walk(path:egret.Point[], walkType:number, complete?:Function, completeTarget?:any):void
	{
		if(!this._aliveFlag) return;
		if(this._view != null)
		{
			(this._view as AliveGameObject).eventWalk(path, walkType, complete, completeTarget);
		}
		else 
		{
			if(path.length > 0)
			{
				let len = path.length - 1;
				this.x = path[len].x;
				this.y = path[len].y;
				if(this.isType(GameObjectType.SELF)) 
				{
					Manager.control.getMap().cmdPlayerWalk([new egret.Point(this.x, this.y)], walkType);
				}
			}
		}
	}

	public stopWalk():void
	{
		if(this._view != null) (this._view as AliveGameObject).eventStopWalk();
	}

	/**
	 * 截取走路的路径,服务器发来的路径，从角色当前位置开始直接走路
	 * location,localX:number,localY:number 角色当前位置
	 */		
	public handleCurentPath(path:egret.Point[],localX:number,localY:number):egret.Point[]
	{
		if(path.length > 0)
		{
			let index:number = 0;
			let start:egret.Point;
			let end:egret.Point;
			for(let i:number = 0; i < path.length - 1; i ++)
			{
				start = path[i];
				end = path[i + 1];
				if(PointUtil.inRect2(start,end,localX,localY))
				{
					path = path.slice(i + 1);
					break;
				}
			}
			if(!(path[0].x == localX && path[0].y == localY)) path.unshift(new egret.Point(localX,localY));
		}
		return path;
	}

	public attrUpdateBlood(oldValue:number):void
	{
		if(this.attrInfo.hp < 0) this.attrInfo.hp = 0;
		else if(this.attrInfo.hp > this.attrInfo.hpMax) this.attrInfo.hp = this.attrInfo.hpMax;
		if(this._view instanceof MonsterGameObject) (this._view as MonsterGameObject).eventBlood();
		else if(this._view instanceof PlayerGameObject) (this._view as PlayerGameObject).eventBlood();
		this.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.HP));
		if(this.attrInfo.hp == 0) this.setAliveFlag(false);
	}

	public attrUpdateNickname():void
	{
		if(this._view != null)(this._view as AliveGameObject).eventNickname();
	}

	public playSCT(sctType:number, sctValue:number, direction:number):void
	{
		if(this._view != null) (this._view as AliveGameObject).eventSct(sctType, sctValue, this.getSctPos(), direction);
	}

	/**
     * 更新地图参与者属性
     * dataType:1--int32, 2--string, 3--int64
     */
	public updatePartAttr(pi:TCPPacketIn, dataType:number):void
    {
        let type:number;
        let value:any;
		let len:number = pi.readShort();
        for(let i:number = 0; i < len; i++)
        {
			type = pi.readByte();
			if(dataType == 1) value = pi.readInt();
			else if(dataType == 2) value = pi.readUTF();
			else if(dataType == 3) value = pi.readInt64();
			if(this.attrInfo == null) continue;//怪物死亡后直接移除，所以会出现attrinfo为null的情况
			if(this.attrInfo.getValue(type) != -1)
			{
				this.attrInfo.setValue(type, value);
			}
        }
	}

	public playSkillEffectInfo(cvo:SkillCVO, effID:number, rotation:number=0, isConfig:boolean=false):void
	{
		// return;
		if(this._view != null)
		{
			let effect:SkillEffectInfo = Manager.pool.create(SkillEffectInfo, cvo, effID, rotation, isConfig);
			(this._view as AliveGameObject).eventSkillEffect(effect);
		}
	}

	public playBomb(target:AliveGameObjectInfo, bombIndex:number, delayTime:number=0):void
	{
		if(this._view == null) return;
		(this._view as AliveGameObject).eventPlayBomb(target, bombIndex, delayTime);
	}

	public canPlayBomb2(x:number,y:number,skill:SkillCVO):boolean
	{
		return egret.Point.distance(new egret.Point(this.x,this.y), new egret.Point(x,y)) > 80 && skill.bombIndex > 0;
	}
	
	public getBombShootPos():egret.Point
	{
		return new egret.Point(this.x, this.y);
	}
	
	/**
	 * @param flag 1脚底 2名称高度 3名称高度一半
	 */		
	public getBuffAniPos(flag:number):egret.Point
	{
		return new egret.Point();
	}
		
	public getSctPos():egret.Point
	{
		return new egret.Point(this.x,this.y);
	}
		
	public getBuffById(groupID:number):BuffCVO
	{
		for(let i:number = 0; i < this._buffLst.length; i++)
		{
			if(this._buffLst[i].groupID == groupID) return this._buffLst[i];
		}
		return null;
	}

	public addBuff(buff:BuffCVO):void 
	{
		this._buffLst.push(buff);
		this.processBuffStatus(buff, true);
		if(this._view instanceof MonsterGameObject) (this._view as MonsterGameObject).updateBuff(buff, true);
		else if(this._view instanceof PlayerGameObject) (this._view as PlayerGameObject).updateBuff(buff, true);
	}
	
	public removeBuff(buff:BuffCVO):void 
	{
		this.processBuffStatus(buff, false);
		this._buffLst.splice(this._buffLst.indexOf(buff), 1);
		if(this._view instanceof MonsterGameObject) (this._view as MonsterGameObject).updateBuff(buff, false);
		else if(this._view instanceof PlayerGameObject) (this._view as PlayerGameObject).updateBuff(buff, false);
	}

	public updateBuffState(value:number, isAdd:boolean):boolean
	{
		if(isAdd)
		{
			if(this._buffState == (value | this._buffState)) return false;
			this._buffState = value | this._buffState;
		}
		else
		{
			if(this._buffState == ((~value) & this._buffState)) return false;
			this._buffState = ((~value) & this._buffState);
		}
		return true;
	}

	public updateIsingState(value:number,isAdd:boolean):void
	{
		if(isAdd)
		{
			if(this._isingState == (value | this._isingState)) return;
			this._isingState = value | this._isingState;
		}
		else
		{
			if(this._isingState == ((~value) & this._isingState)) return;
			this._isingState = ((~value) & this._isingState);
		}
	}

	protected processBuffStatus(buff:BuffCVO, isAdd:boolean):void 
	{
		if(buff == null) return;
		if(buff.statusType != 0) 
		{
			switch(buff.statusType)
			{
				case BuffStatusType.JIN_TIAO:
					this.updateBuffState(BodyStateManger.BUFF_JIN_TIAO,isAdd);
					break;
				case BuffStatusType.JIAN_HUI_XUE:
					this.updateBuffState(BodyStateManger.BUFF_JIAN_HUI_XUE,isAdd);
					break;
				case BuffStatusType.XUAN_YUN:
					this.setActionStr(FigureAction.STAND);
					this.updateBuffState(BodyStateManger.BUFF_XUAN_YUN,isAdd);
					break;
				case BuffStatusType.ZHONG_DU:
					this.updateBuffState(BodyStateManger.BUFF_ZHONG_DU,isAdd);
					break;
				case BuffStatusType.CHAO_FENG:
					this.updateBuffState(BodyStateManger.BUFF_CHAO_FENG,isAdd);
					break;
				case BuffStatusType.CHEN_MO:
					this.updateBuffState(BodyStateManger.BUFF_CHEN_MO,isAdd);
					break;
				case BuffStatusType.BIAN_YANG:
					this.updateBuffState(BodyStateManger.BUFF_BIAN_YANG,isAdd);
					break;
			}
		}
		
		if(buff.color > 0)
		{
			if(isAdd) this.setColorFilter(buff.color, buff.colorPriority);
			else this.setColorFilter(0, 0);
		}
		let changeId:number = buff.changeStyleId;
		if(changeId != -1)
		{
			this.setBianState(isAdd ? changeId : 0);
		}
	}

	public setBianState(value:number):void
	{
		if(this.bianID == value) return;
		this.bianID = value;
		if(this._view != null && this._view instanceof PlayerGameObject) (this._view as PlayerGameObject).eventStyle();
	}
		
	public isBuffState(value:number):boolean
	{
		return value == (this._buffState & value);
	}
	
	public isingState(value:number):boolean
	{
		return value == (this._isingState & value);
	}

	public dispose():void
	{
		egret.clearTimeout(this._tempTimeHitedWhite);
		Manager.pool.push(this.attrInfo);
		this.attrInfo = null;
		Manager.render.remove(this.cancelBattleFlag, this);
		super.dispose();
	}
}