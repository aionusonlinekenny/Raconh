/**
 * 角色对象模型
 * @uddate devil 2017-11-16
 */
class GameObjectModel
{
	private _objects:any;//游戏对象Info的集合
	private _queues:GameObjectInfo[];

	private showCount:number = 30;//其它玩家最多显示数量
	private _needShowInfos:GameObjectInfo[];//超数量，还没显示的其它玩家info
	
	private _isAddTrainingEffect:boolean = false;//标记是否需要添加传功场景特效

	public constructor()
	{
		this._objects = {};
        let types:number[] = GameObjectType.types;
        let len = types.length;
        let i:number = 0;
        while(i < len)
        {
            this._objects[types[i]] = [];
            i ++;
        }
		this._queues = [];
		this._needShowInfos = [];
	}

	/**
	 * 填加游戏对象 ，如果是自己则及时填加
	 */		
	public addGameObject(info:GameObjectInfo):void
	{
		let type = info.getType();
		if(type == GameObjectType.OTHER && this._objects[type].length >= this.showCount)//其它玩家数量，限制不超一定数量
		{
			this._needShowInfos.push(info);
			return;
		}


		if(this._objects[type].indexOf(info) == -1) this._objects[type].push(info);
		if(type == GameObjectType.DROP)
		{
			Manager.control.getMap().addGameObject(info.createGameObject());
			return;
		}
		if(this._queues.indexOf(info) == -1)
		{
			if(type == GameObjectType.SELF) this._queues.unshift(info);
			else this._queues.push(info);
		}
		if(this._queues.length > 0 && !Manager.render.contains(this.render,this))
		{
			Manager.render.add(this.render, this, 100)
		}
	}

	public render():void
	{
		if(this._queues.length > 0)
		{
			let info:GameObjectInfo = this._queues.shift();
			if(info.getType() == GameObjectType.NPC && !Manager.model.self.isIn9Scale(info, 3)){}
			// else if(info.getType() == GameObjectType.JUMP_POINT && !Manager.model.self.isIn9Scale(info)){}
			else if(info.getType() == GameObjectType.JUMP_POINT){}
			else if(info.getType() == GameObjectType.SCENE_EFF && !Manager.model.self.isIn9Scale(info, 5)){}
			else if(info.getType() == GameObjectType.SCENE_ROBOT && !Manager.model.self.isIn9Scale(info, 2)){}
			else
			{
				Manager.control.getMap().addGameObject(info.createGameObject());
			}
		}
		if(this._queues.length <= 0)Manager.render.remove(this.render,this);
	}
	
	public getMonsterGameObject(id:number):MonsterGameObjectInfo
	{
		let types:number[] = GameObjectType.monsterTypes;
		let len:number = types.length;
		let monster:MonsterGameObjectInfo;
		for(let i:number = 0; i < len; i ++)
		{
			monster = this.getGameObject(id,types[i]) as MonsterGameObjectInfo;
			if(monster != null) return monster; 
		}
		return null;
	}

	public test():PlayerGameObjectInfo
	{
		let infos:PlayerGameObjectInfo[] = this._objects[GameObjectType.OTHER];
		return infos.length > 0 ? infos[0] : null;
	}

	public getSceneEffByType(sceneEffType:number):SceneEffGameObjectInfo
	{
		let infos:SceneEffGameObjectInfo[] = this._objects[GameObjectType.SCENE_EFF];
		for(let i:number = 0; i < infos.length; i ++)
		{
			if(infos[i].cvo.type == sceneEffType) return infos[i];
		}
		return null;
	}
	public getSceneEffByCvoId(sceneEffID:number):SceneEffGameObjectInfo
	{
		let infos:SceneEffGameObjectInfo[] = this._objects[GameObjectType.SCENE_EFF];
		for(let i:number = 0; i < infos.length; i ++)
		{
			if(infos[i].cvo.id == sceneEffID) return infos[i];
		}
		return null;
	}
	

	/**
	 * 从场景中删除对象 
	 * isImmediately	是否立即删除。如果为false,则会延时删除，用于处理怪物死亡的效果
	 * delayTime    isImmediately为false时，延迟delayTime(毫秒)再移除gameobject
	 */		
	public removeGameObject(info:GameObjectInfo,isImmediately:boolean=true,delayTime:number=2000):void
	{
		if(info == null) return;
		let index:number = this._objects[info.getType()].indexOf(info);
		if(index != -1)
		{
			let type:number = info.getType();
			this._objects[type].splice(index,1);
			let self:SelfGameObjectInfo = Manager.model.self;
			if(self.target == info) self.updateTarget(null);
			if(self.selfPet != null &&self.selfPet.target == info) self.selfPet.updateTarget(null);
			info.remove(false,isImmediately,delayTime);

			if(type == GameObjectType.OTHER && this._needShowInfos.length > 0) this.addGameObject(this._needShowInfos.shift());//删除其它玩家时，如果还有没显示的其它玩家，则添加
		}
		index = this._queues.indexOf(info);
		if(index != -1) this._queues.splice(index,1);
	}

	/**
	 * 获取指定ID与角色类型的角色信息 
	 * @param id				
	 * @param gameObjectType	GameObjectType常量 ,如果为-1，则会遍历所有类型与对应的ID信息类
	 */		
	public getGameObject(id:number, gameObjectType:number = -1):GameObjectInfo
	{
		let info:GameObjectInfo;
		if(gameObjectType == -1)
		{
			let types:number[] = GameObjectType.types;
			let len:number = types.length;
			for(let i:number = 0 ; i < len; i ++)
			{
				info = this.getGameObject(id, types[i]);
				if(info != null) return info;
			}
		}
		else 
		{
			let infos:GameObjectInfo[] = this._objects[gameObjectType];
			let len:number = infos.length;
			for(let i:number = 0; i < len; i++)
			{
				if(infos[i].id == id) return infos[i];
			}

			//如果是其它玩家，还要查找未显示列表
			if(gameObjectType == GameObjectType.OTHER && (len = this._needShowInfos.length) > 0)
			{
				for(let i:number = 0; i < len; i++)
				{
					if(this._needShowInfos[i].id == id) return this._needShowInfos[i];
				}
			} 
		}
		return null;
	}

	/**
	 * 删除游戏中除了自己角色外的所有角色 
	 */		
	public removeGameObjects():void
	{
		this._needShowInfos = [];//没显示的其它玩家列表，先清除，防边删边加

		let types:number[] = GameObjectType.types;
		let len:number = types.length;
		let objects:GameObjectInfo[];
		for(let i:number = 0 ; i < len; i ++)
		{
			objects = this._objects[types[i]];
			let j:number = objects.length - 1;
			while(j >= 0)
			{
				if(types[i] == GameObjectType.SELF){}
				else if(types[i] == GameObjectType.SELF_PET)
				{
					(objects[j] as PetGameObjectInfo).stopWalk();
				}
				else this.removeGameObject(objects[j]);
				j --;
			}
		}
	}

	public removeGameObjectByType(type:number):void
	{
		let objects:GameObjectInfo[] = this._objects[type];
		let i:number = objects.length - 1;
		while(i >= 0)
		{
			this.removeGameObject(objects[i]);
			i --;
		}
	}

	/**
	 * 获取指定ID的玩家信息 
	 */		
	public getPlayerGameObject(id:number):PlayerGameObjectInfo
	{
		if(id == Manager.model.self.id) return Manager.model.self;
		return this.getGameObject(id, GameObjectType.OTHER) as PlayerGameObjectInfo;
	}

	private _hasInitSelf:boolean;
    public createElement():void
    {
		this.createSelf();
        this.createNPCs();
		this.createJumpPoints();
		this.createSceneEff();
		this.createSceneRobot();
    }

    private createSelf():void
    {
		if(this._hasInitSelf) return;
		let self = Manager.model.self
        this.addGameObject(self);
        this._hasInitSelf = true;
		
        if(self.attrInfo.petAniID > 0)
		{
			let pet:SelfPetGameObjectInfo = Manager.pool.create(SelfPetGameObjectInfo);
			pet.attrInfo.speed = 220;
        	pet.owner = self;
			pet.attrUpdateAni();
        	self.setPet(pet);
		}
    }

    private createNPCs():void
    {
        let npcs:NpcCVO[] = NpcCVO.getCVOsAtMap(Manager.model.getMap().getId());
        let info:NPCGameObjectInfo;
		let len:number = npcs.length;
        for(let i:number = 0; i < len; i ++)
        {
            info = Manager.pool.create(NPCGameObjectInfo, npcs[i].id, npcs[i]);
            info.updatePostion(npcs[i].position.x, npcs[i].position.y);
            this.addGameObject(info);
        }
    }

	private createJumpPoints():void
	{
		let jumps:JumpPointCVO[] = JumpPointCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
		if(jumps == null || jumps == undefined) return;
		let info:JumpPointGameObjectInfo;
		for(let i:number = 0; i < jumps.length; i ++)
		{
			info = Manager.pool.create(JumpPointGameObjectInfo, jumps[i].id, jumps[i]);
			info.updatePostion(jumps[i].posX, jumps[i].posY);
			Manager.model.getGameobject().addGameObject(info);
		}
	}

	private createSceneEff():void
	{
		let effect:SceneEffCVO[] = SceneEffCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
		if(effect == null || effect == undefined || (effect.length == 0)) return;
		let info:SceneEffGameObjectInfo;
		for(let i:number = 0; i < effect.length; i ++)
		{
			if(effect[i].isTrainingEff && !this._isAddTrainingEffect) continue;
			info = Manager.pool.create(SceneEffGameObjectInfo, effect[i].id, effect[i]);
			info.updatePostion(effect[i].position.x, effect[i].position.y);
			Manager.model.getGameobject().addGameObject(info);
		}
	}

	private createSceneRobot():void
	{
		let robots:SceneRobotCVO[] = SceneRobotCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
		if(robots == null || robots == undefined || (robots.length == 0)) return;
		let info:SceneRobotGameObjectInfo;
		for(let i:number = 0; i < robots.length; i ++)
		{
			info = Manager.pool.create(SceneRobotGameObjectInfo, robots[i].id, robots[i]);
			info.updatePostion(robots[i].posx, robots[i].posy);
			Manager.model.getGameobject().addGameObject(info);
		}
	}

	public setTrainingEffect(isAdd:boolean):void
	{
		if(isAdd)
		{
			if(this._isAddTrainingEffect) return;
			if(!Manager.model.getMap().mapCVO) return;
			this._isAddTrainingEffect = true;
			let effect:SceneEffCVO[] = SceneEffCVO.getCVOsByMapID(Manager.model.getMap().mapCVO.res);
			let info:SceneEffGameObjectInfo;
			for(let i:number = 0; i < effect.length; i ++)
			{
				if(!effect[i].isTrainingEff) continue;
				info = Manager.pool.create(SceneEffGameObjectInfo, effect[i].id, effect[i]);
				info.updatePostion(effect[i].position.x, effect[i].position.y);
				Manager.model.getGameobject().addGameObject(info);
			}
		}
		else
		{
			this._isAddTrainingEffect = false;
			let objects:GameObjectInfo[] = this._objects[GameObjectType.SCENE_EFF];
			let info:SceneEffGameObjectInfo;
			for(let j:number = objects.length - 1; j >= 0; j--)
			{
				info = objects[j] as SceneEffGameObjectInfo;
				if(!info.cvo.isTrainingEff) continue;
				this.removeGameObject(info);
			}
		}
	}

	/**
	 * 自动挂机更新玩家的目标 
	 */		
	public updateHookTarget():boolean
	{
		let self:SelfGameObjectInfo = Manager.model.self;
		if(self.target != null)
		{
			if((self.target instanceof MonsterGameObjectInfo) || (self.target instanceof PlayerGameObjectInfo))
			{
				if((self.target).canHited(false))
				{
					self.updateTarget(self.target);
					return true;
				}
			}
		}
		
		let playerResults:GameObjectInfo[] = [];
		if(self.attrInfo.pkMode == PKType.ACT || self.attrInfo.pkMode == PKType.ALL)//挂机打人
		{
			let player:PlayerGameObjectInfo;
			let players:PlayerGameObjectInfo[] = this._objects[GameObjectType.OTHER] as PlayerGameObjectInfo[];
			for(let i:number = 0; i < players.length; i++)
			{
				player = players[i];
				if(!player.canHited(false)) continue;
				player.farToSelf = new egret.Point(self.x,self.y).subtract(new egret.Point(player.x,player.y)).length;
				playerResults.push(player);
			}
		}
		let monsters:MonsterGameObjectInfo[] = this._objects[GameObjectType.MONSTER_NORMAL] as MonsterGameObjectInfo[];
		monsters = (this._objects[GameObjectType.MONSTER_BOSS] as MonsterGameObjectInfo[]).concat(monsters);
		let monster:MonsterGameObjectInfo;
		let monsterResults:GameObjectInfo[] = [];
		for(let i:number = 0; i < monsters.length; i++)
		{
			monster = monsters[i];
			if(!monster.canHited(false)) continue;
			if(monster.cvo.outHookList) continue;
			monster.farToSelf = new egret.Point(self.x,self.y).subtract(new egret.Point(monster.x,monster.y)).length;
			monsterResults.push(monster);
		}
		
		if(monsterResults.length > 0)
		{
			monsterResults.sort(GameUtil.sortDistance2);
			//野外地图冲到怪堆里面去打，所以取中间距离的怪为目标
			let autoIndex:number = (Manager.model.getMap().mapCVO.isFieldMap) ? Math.floor(monsterResults.length >> 1) : 0;
			self.updateTarget(monsterResults[autoIndex] as GameObjectInfo);
			return true;
		}
		else if(playerResults.length > 0)
		{
			playerResults.sort(GameUtil.sortDistance);
			self.updateTarget(playerResults[0] as GameObjectInfo);
			return true;
		}
		return false;
	}

	/**根据类型返回对象数组 */
	public getGameObjectsByType(gameObjectType:number):GameObjectInfo[]
	{
		let infos:GameObjectInfo[] = this._objects[gameObjectType];
		return infos;
	}

	public checkJumpPointTrigger():void
	{
		let self:SelfGameObjectInfo = Manager.model.self;
		if(self.isingState(BodyStateManger.ISING_JUMP)) return;
		if(self.isingState(BodyStateManger.ISING_SPRINT)) return;
		if(self.isingState(BodyStateManger.ISING_FLY)) return;
		if(self.isingState(BodyStateManger.ISING_SLIDE)) return;
		if(self.isingState(BodyStateManger.ISING_KITE)) return;
		if(self.isingState(BodyStateManger.ISING_WATER)) return;
		let infos:JumpPointGameObjectInfo[] = this._objects[GameObjectType.JUMP_POINT];
		for(let i:number = 0; i < infos.length; i ++)
		{
			if(infos[i].cvo.canTrigger(Manager.model.getMap().mapCVO.res, self.x, self.y))
			{
				if(!Manager.model.getAuto().autoHook && Manager.walk.findInfo == null && self && self.view)
				{
					let targetPos:egret.Point = (self.view as SelfGameObject).getWalkTarget();
					if(targetPos) Manager.walk.findInfo = Manager.pool.create(MapFindInfo, targetPos, null);
				}
				if(infos[i].cvo.scriptType > 0) Manager.jump.curInfo = infos[i];
				else Manager.jump.curInfo = null;
				Manager.jump.jump(infos[i].cvo.targets);
				
				break;//触发一个就不再判断其他跳跃点
			}
		}
	}
}