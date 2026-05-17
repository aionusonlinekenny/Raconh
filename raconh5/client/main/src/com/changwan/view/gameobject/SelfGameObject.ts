/**
 *角色自己视图
 * Anydo
 * create  
 * update devil 2017-11-08
*/
class SelfGameObject extends PlayerGameObject
{
    private get selfInfo():SelfGameObjectInfo{ return (this._info as SelfGameObjectInfo); }

	private SPRINT_DIS:number = 700;

	public constructor()
	{
		super();
	}

	protected createAction():void
	{
		this._action = Manager.pool.create(SelfAction, this._aliveGameObjectInfo);
	}

	public getWalkTarget():egret.Point
	{
		return this._action ? this._action.getWalkTarget() : null;
	}

	public eventAliveFlag():void
	{
		super.eventAliveFlag();
		Manager.jump.finishJump();
	}

	public eventLevel(oldLevel:number):void
	{
		if((this._aliveGameObjectInfo.attrInfo.level > oldLevel) && !Manager.global.lifecyclePause)
		{
			let ani:Animation = Manager.animation.createEffectAnimation("roleLevelUp");
			this.addChild(ani);
		}
		super.eventLevel(oldLevel);
	}

	public eventPosition():void
	{
		super.eventPosition();
		Manager.control.getMap().view.setCenter(this._info.x,this._info.y);
	}

	public eventWalk(path:egret.Point[],walkType:number,complete?:Function, completeTarget?:any):void
	{
		super.eventWalk(path,walkType,complete,completeTarget);
		Manager.control.getMap().cmdPlayerWalk(path, walkType);
	}

	public eventCancelAction():void
	{
		this._action.cancel();
	}

	public eventTarget():void
	{
		if(this.selfInfo.target != null)
		{
			this.gotoTarget();
		}
		else
		{
			this._action.stopWalk();
		}
	}

	private gotoTarget():void 
	{
		let that = this;
		if(that.selfInfo.isingState(BodyStateManger.ISING_JUMP)) return;
		if(that.selfInfo.isingState(BodyStateManger.ISING_SPRINT)) return;
		if(that.selfInfo.isBuffState(BodyStateManger.BUFF_XUAN_YUN)) return;

		let startPos:egret.Point = new egret.Point(that._info.x, that._info.y);
		let targetPos:egret.Point = new egret.Point(that.selfInfo.target.x, that.selfInfo.target.y);
		let path:Array<egret.Point> = Manager.model.getMap().findPath.findpath(startPos,targetPos);
		let maxRange:number = Manager.model.getSkill().currentSkill.maxRange;
		let pathSkill:Array<egret.Point> = PathUtils.processPath(path, maxRange);
		
		if(path == null && !Manager.model.getMap().isWalkPoint(that._info.x, that._info.y))
		{
			Manager.model.self.walk([startPos, targetPos], WalkType.SPRINT);//如果卡死点，则直接冲刺到目标点
			return;
		}
		if(pathSkill != null && pathSkill.length > 0)
		{
			if(that.selfInfo.target instanceof MonsterGameObjectInfo || that.selfInfo.target instanceof PlayerGameObjectInfo)
			{
				let distance = egret.Point.distance(startPos, targetPos);
				if(distance < (maxRange + 60))
				{
					that.eventWalk(pathSkill, WalkType.WALK);
				}
				else if(distance > (that.SPRINT_DIS + 1))
				{
					//上面一行要＋1，因为少于1像素PathUtils.processPath会返回只有一个点的路径，会导致寻路失败。
					let pathSprint:Array<egret.Point> = PathUtils.processPath([startPos, targetPos], that.SPRINT_DIS);
					// if(pathSprint != null && pathSprint.length > 0) that.eventWalk(pathSprint, WalkType.WALK);
					if(pathSprint != null && pathSprint.length > 1) 
					{
						if(!Manager.model.getMap().isWalkPoint(pathSprint[pathSprint.length-1].x, pathSprint[pathSprint.length-1].y))
						{
							let pathSprint2:Array<egret.Point> = PathUtils.processPath(path, that.SPRINT_DIS);
							that.eventWalk(pathSprint2, WalkType.WALK);
						}
						else that.eventWalk(pathSprint, WalkType.WALK);
					}
					else that.eventWalk(pathSkill, WalkType.WALK);
				}
				else
				{
					let pos:egret.Point = targetPos.subtract(startPos);
					let vd:Vector2D = new Vector2D(pos.x, pos.y);
					vd.length = egret.Point.distance(startPos, targetPos) - maxRange;
					let target2Pos:egret.Point = startPos.add(new egret.Point(vd.x, vd.y));
					if(!Manager.model.getMap().isWalkPoint(target2Pos.x, target2Pos.y)) 
					{
						target2Pos = targetPos;
					}
					that.eventWalk([startPos, target2Pos], WalkType.SPRINT);
				}
			}
			else that.eventWalk(pathSkill, WalkType.WALK);
		}
	}

	public eventJump(targets:egret.Point[], completeF?:Function): void
	{
		var startPos:egret.Point = new egret.Point(this._aliveGameObjectInfo.x, this._aliveGameObjectInfo.y);
		(this._action as SelfAction).jump(startPos, targets);
		let path:egret.Point[] = targets.concat();
		path.unshift(startPos.clone());
		Manager.control.getMap().cmdPlayerWalk(path, WalkType.JUMP);
	}
}