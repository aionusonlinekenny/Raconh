/**
 *人物视图信息类
 * Anydo
 * create  
 * update devil 2017-11-08
*/
class PlayerGameObjectInfo extends AliveGameObjectInfo
{	
	protected _jumpHeigth:number = 0;
	public get jumpHeigth():number { return this._jumpHeigth;}
	
	//跳跃、冲刺的时候添加残影
	public needCanYing:boolean;
	
	protected _pet:PetGameObjectInfo;

	public get clothes():number
	{
		 return this.attrInfo.clothes;
	}
	public get weapon():number
	{
		 return this.attrInfo.weapon;
	}
	public get wing():number
	{
		 return this.attrInfo.wing; 
	}
	protected _role:RoleInfo;
	public get role():RoleInfo
	{
		 return this._role; 
	}

	public attrUpdateMoveSpeed():void
	{
		if(this._view != null)(this._view as PlayerGameObject).eventSpeed();
	}
		
	public canHited(showMsg:boolean):boolean
	{
		var self:SelfGameObjectInfo = Manager.model.self;
		if(self.attrInfo.pkMode == PKType.PEACE)
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle10"));//您处于和平模式，不能进行PK！
			return false;
		}
		if(!this._aliveFlag)
		{
			if(showMsg)  FloatTips.addTips(LangCVO.getContent("pk25"));//目标已死亡
			return false;
		}
		if(self.attrInfo.bfType == BFType.ARENA) return false;//个人竞技不能战斗
		if(Manager.model.getMap().isAbsolutrPoint(this.x, this.y)) 
		{
			if(showMsg)  FloatTips.addTips(LangCVO.getContent("battle15"));//对方处于安全区域，不能进行PK！
			return false;
		}
		if(Manager.model.getMap().isAbsolutrPoint(self.x, self.y)) 
		{
			if(showMsg)  FloatTips.addTips(LangCVO.getContent("battle16"));//您处于安全区域，不能进行PK！
			return false;
		}
		if(self.attrInfo.pkMode == PKType.ALL) return true;
		if(self.attrInfo.pkMode == PKType.CLUB)
		{
			if(self.attrInfo.guildName == this.attrInfo.guildName && self.attrInfo.guildName != "")
			{
				if(showMsg)  FloatTips.addTips(LangCVO.getContent("battle13"));//您和对方同在一个战盟，不能进行PK！
				return false;
			}
		}
		if(!Manager.model.getMap().isWalkPoint(this.x, this.y))
		{
			if(showMsg)  FloatTips.addTips(LangCVO.getContent("battle12"));
			return false;
		}
		if(!this.isType(GameObjectType.SELF) && self.isingState(BodyStateManger.ISING_BF))
		{
			if(self.attrInfo.union > 0)
			{
				if(self.attrInfo.union == this.attrInfo.union)
				{
					if(showMsg)  FloatTips.addTips(LangCVO.getContent("battle14"));//不可攻击相同阵营的成员！
					return false;
				}
			}
		}
		return true;
	}

	public attrUpdatePkMode():void
	{
		if(this._view != null)(this._view as PlayerGameObject).eventPkMode();
	}

	public attrUpdateVipLevel():void
	{
		if(this._view != null)(this._view as PlayerGameObject).eventVipLevel();
		this.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.VIP_LEVEL));
	}

	public attrUpdateTitle():void
	{
		if(this._view != null)(this._view as PlayerGameObject).eventTitle();
	}

	public isSetTraining:boolean;
	public isTraining(value:boolean):void
	{
		if(this._view != null)
		{
			(this._view as PlayerGameObject).eventTraining(value);
			this.isSetTraining = value;
		}
	}

	public attrUpdateGuild():void
	{
		if(this._view != null)(this._view as PlayerGameObject).eventGuild();
	}

	public attrUpdatePet():void
	{
		if(this.attrInfo.petAniID > 0)
		{
			let pet = this.getPet();
        	if(!pet)
        	{
        		pet = Manager.pool.create(this.isType(GameObjectType.SELF) ? SelfPetGameObjectInfo : PetGameObjectInfo);
            	pet.attrInfo.speed = 220;
            	this.setPet(pet);
        	}
			pet.attrUpdateAni();
		}
		else this.setPet(null);
	}

	public getAnimationType():number
	{
		return AnimationType.PLAYER;
	}

	 public getName():string
	 {
		 return this.attrInfo.nickName;
	}

	public attrUpdateLevel(oldValue:number):void
	{
		if(this._view != null)(this._view as PlayerGameObject).eventLevel(oldValue);
		this.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.LEVEL));
	}

	public getType():number
	{
		return GameObjectType.OTHER;
	}

	private attackActionIndex:number;//攻击动作索引临时标记

	protected start():void
	{
		this.attackActionIndex = 0;
		super.start();
	}

	public reuse(id:number,role:RoleInfo):void
	{
		this._role = role;
		super.reuse(id);
	}

	public unuse():void
	{
		super.unuse();
		if(this._role != null)
		{
			Manager.pool.push(this._role);
			this._role = null;
		}
		this._pet = null;
	}

	public setAliveFlag(value:boolean):void
	{
		if(!value)
		{
            this.resetHitedWhiteFilter();
			let self:SelfGameObjectInfo = Manager.model.self;
			if(self.target == this) self.updateTarget(null);
			if(self.selfPet != null && self.selfPet.target == this) self.selfPet.updateTarget(null);
			this.updateIsingState(BodyStateManger.ISING_JUMP,false);
			this.updateIsingState(BodyStateManger.ISING_SPRINT,false);
			this.updateIsingState(BodyStateManger.ISING_SLIDE, false);
			this.updateIsingState(BodyStateManger.ISING_KITE, false);
			this.updateIsingState(BodyStateManger.ISING_WATER, false);
		}
		super.setAliveFlag(value);
	}
	
	public setBattleFlag(value:boolean):void
	{
		super.setBattleFlag(value);
		let selfId:number = Manager.model.self.id;
		if(this._view && (this.id == selfId || this.attackID == selfId)) (this._view as PlayerGameObject).eventStrip(value);
	}

	public updateStyle(clothes:number, weapon:number, wing:number):void
	{
		let isChange:boolean = (this.attrInfo.clothes != clothes || this.attrInfo.weapon != weapon || this.attrInfo.wing != wing);
		if(isChange)
		{
			this.attrInfo.clothes = clothes;
			this.attrInfo.weapon = weapon;
			this.attrInfo.wing = wing;
			if(this._view != null && !this.hasBianID)(this._view as PlayerGameObject).eventStyle();
		}
	}

	public parse(data:TCPPacketIn):void
	{
        this.attrInfo.setValue(AttrDescType.NICKNAME, data.readUTF());
        this.attrInfo.setValue(AttrDescType.HP_MAX, data.readInt64());
        this.attrInfo.setValue(AttrDescType.HP, data.readInt64());
        this.attrInfo.setValue(AttrDescType.SPEED, data.readShort());
		this.updatePostion(data.readShort(),data.readShort());
        this.attrInfo.setValue(AttrDescType.UNION, data.readInt());
        this.attrInfo.setValue(AttrDescType.PK_MODE, data.readByte());
        this.attrInfo.setValue(AttrDescType.LEVEL, data.readShort());
        this.attrInfo.setValue(AttrDescType.FIGHT, data.readInt());
        this.attrInfo.setValue(AttrDescType.CAREER, data.readByte());
        this.attrInfo.setValue(AttrDescType.HEAD_ICON, data.readByte());
        this.attrInfo.setValue(AttrDescType.TURN_LIVE, data.readByte());
        this.attrInfo.setValue(AttrDescType.TITLE_ID, data.readShort());
		this.updateGuild(data.readInt64(), data.readByte(), data.readUTF(), data.readUTF());
        this.attrInfo.setValue(AttrDescType.VIP_LEVEL, data.readByte());
        this.attrInfo.setValue(AttrDescType.BF_TYPE, data.readInt());
		this.updateStyle(data.readShort(), data.readShort(), data.readShort());
		this.attrInfo.setValue(AttrDescType.PET_ANI, data.readShort());
        this.parseBuff(data);
		this.attrInfo.setValue(AttrDescType.TRAINING_TYPE, data.readByte());
		this.attrInfo.setValue(AttrDescType.TRAINING_POS, data.readShort());
		this.attrInfo.setValue(AttrDescType.TRAINING_STATUS, data.readByte());
	}

	public handleCurentPath(path:egret.Point[],localX:number,localY:number):egret.Point[]
	{
		if(this.isingState(BodyStateManger.ISING_JUMP)) return path;
		return super.handleCurentPath(path, localX, localY);
	}

	private parseBuff(data:TCPPacketIn):void
	{
		let buff:BuffCVO;
		let buffGroupID:number;
        let buffLevel:number;
		let buffLen:number = data.readShort();
		for(let i:number = 0; i < buffLen; i++)
		{
			buffGroupID = data.readInt();
            buffLevel = data.readByte();
            buff = this.getBuffById(buffGroupID) as BuffCVO;
			if(buff == null)
			{
				buff = BuffCVO.getCVO(buffGroupID, buffLevel);
				this.addBuff(buff);
			}
		}
	}

	public updateGuild(guildId:number, guildJob:number, guildName:string, guildJobName:string):void
	{
		if(this.attrInfo.guildID == guildId && this.attrInfo.guildJob == guildJob && this.attrInfo.guildName == guildName) return;
		this.attrInfo.guildID = guildId;
		this.attrInfo.guildJob = guildJob;
		this.attrInfo.guildName = guildName;
		this.attrInfo.guildJobName = guildJobName;
		if(this._view != null)(this._view as PlayerGameObject).eventGuild();
	}

	public getPet():PetGameObjectInfo
	{
		return this._pet;
	}
	public setPet(value:PetGameObjectInfo):void
	{
		if(this._pet != null && this._pet != value) 
		{
			Manager.model.getGameobject().removeGameObject(this._pet);
		}
		
		if(this._pet == value) return;
		this._pet = value;
		
		if(this._pet != null)
		{
			this._pet.setActionStr(FigureAction.STAND);
			this._pet.owner = this;
			if(!this._pet.isInvented) Manager.model.getGameobject().addGameObject(this._pet);
		}
	}

	public attrUpdateBlood(oldValue:number):void
	{
		super.attrUpdateBlood(oldValue);
		if(!this._aliveFlag && this.attrInfo.hp > 0) this.setAliveFlag(true);
	}

	public playRandomAttack():void
	{
		this.attackActionIndex ++;
		if(this.attackActionIndex > 3) this.attackActionIndex = 1;
		this.setActionStr("attack" + this.attackActionIndex);
	}

	public getBombShootPos():egret.Point
	{
		return new egret.Point(this.x, this.y - 70);
	}
	
	/**
	 * @param flag 1脚底 2名称高度 3名称高度一半
	 */	
	public getBuffAniPos(flag:number):egret.Point
	{
		if(flag == 1) return new egret.Point();
		else if(flag == 2) return new egret.Point(0,-190);
		return new egret.Point(0,-70);
	}
		
	public getSctPos():egret.Point
	{
		return new egret.Point(this.x, this.y - 70);
	}
		
	public updateBuffState(value:number, isAdd:boolean):boolean 
	{
		let bol:boolean = super.updateBuffState(value, isAdd);
		if(bol)
		{
			if(!this.can(CanType.CAN_WALK, false) || !this.can(CanType.CAN_JUMP, false) || !this.can(CanType.CAN_SPRINT, false))
			{
				if(this._view != null)(this._view as PlayerGameObject).stopWalk();
			}
		}
		return bol;
	}

	public dispatchJumpSyn(startPos:egret.Point, targets:egret.Point[]):void
	{
		if(this._view != null) (this._view as PlayerGameObject).eventJumpSyn(startPos, targets);
		this.updateIsingState(BodyStateManger.ISING_JUMP, true);
	}

	public updateJumpHeight(h:number):void
	{
		this._jumpHeigth = h;
		if(this._view != null) (this._view as PlayerGameObject).eventJumpHeight(h);
	}
	
	public finishJump():void
	{
		this._jumpHeigth = 0;
		if(this._view != null) (this._view as PlayerGameObject).eventJumpHeight(0);
		this.updateIsingState(BodyStateManger.ISING_JUMP, false);
	}

	public can(canType:number, showMsg:boolean):boolean
	{
		if(!Manager.model.getMap().mapDataLoadComplete)
		{
			return false;
		}
		if(this.isingCan(canType,BodyStateManger.ISING_FLY))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle1"));
		}
		else if(this.isingCan(canType,BodyStateManger.ISING_JUMP))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle2"));
		}
		else if(this.isingCan(canType,BodyStateManger.ISING_SPRINT))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle3"));
		}
		else if(this.isingCan(canType,BodyStateManger.ISING_BF))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle4"));
		}
		else if(this.isingCan(canType,BodyStateManger.ISING_SUB))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle5"));
		}
		else if(this.buffCan(canType,BodyStateManger.ISING_SLIDE))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle17"));
		}
		else if(this.buffCan(canType,BodyStateManger.ISING_KITE))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle18"));
		}
		else if(this.buffCan(canType,BodyStateManger.ISING_WATER))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle19"));
		}
		else if(this.buffCan(canType,BodyStateManger.BUFF_XUAN_YUN))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle6"));
		}
		else if(this.buffCan(canType,BodyStateManger.BUFF_JIN_TIAO))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle7"));
		}
		else if(this.buffCan(canType,BodyStateManger.BUFF_CHAO_FENG))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle8"));
		}
		else if(this.buffCan(canType,BodyStateManger.BUFF_CHEN_MO))
		{
			if(showMsg) FloatTips.addTips(LangCVO.getContent("battle9"));
		}
		else
		{
			return true;
		}
		return false;
	}
	
	private buffCan(canType:number,state:number):boolean
	{
		return this.isBuffState(state) && (Manager.bodyState.buffCanDic[state] & canType) == canType;
	}
	
	private isingCan(canType:number,state:number):boolean
	{
		return this.isingState(state) && (Manager.bodyState.isingCanDic[state] & canType) == canType;
	}
		
	public isBuffState(value:number):boolean
	{
		return value == (this._buffState & value);
	}
	
	public isingState(value:number):boolean
	{
		return value == (this._isingState & value);
	}

	public remove(onlyView:boolean,isImmediately:boolean = true):void
    {
        if(!onlyView)
        {
            if(this._pet != null) 
			{
				Manager.model.getGameobject().removeGameObject(this._pet);
				this._pet = null;
			}
        }
		super.remove(onlyView, isImmediately);
    }
		
	public createGameObject():GameObject
	{
		if(this._view == null)this._view = Manager.pool.create(PlayerGameObject,this)
		return this._view;
	}

	public dispose():void
	{
		if(this._role != null)
		{
			Manager.pool.push(this._role);
			this._role = null;
		}
		super.dispose();
		this._pet = null;
	}
}