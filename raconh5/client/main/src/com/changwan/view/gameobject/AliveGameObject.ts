/**
 *生命对象视图
 * Anydo
 * create  
 * update devil 2017-11-08
*/
class AliveGameObject extends GameObject
{
	private _elementBuff:ElementBuffAnimation;
	private _elementSkillEffect:ElementSkillEffect;

	protected _action:Action;
	protected _aliveGameObjectInfo:AliveGameObjectInfo;

	protected _bloodStrip3:BloodStripView2;
	protected _bloodContainer:egret.DisplayObjectContainer;
	private _bombDelayTime:number;
	
	private _hasChangeBuff:boolean;
	private set hasChangeBuff(value:boolean)
	{
		if(this._hasChangeBuff == value)return;
		this._hasChangeBuff = value;
		this.invalidate(InvalidationType.GO_BUFF);
	}

	public reuse(info:GameObjectInfo):void
	{
		this._aliveGameObjectInfo = info as AliveGameObjectInfo;
		super.reuse(info);
	}

	public unuse():void
	{
		super.unuse();
		if(this._action != null)
		{
			Manager.pool.push(this._action);
			this._action = null;
		}
		if(this._bloodStrip3 != null)
		{
			// Manager.pool.push(this._bloodStrip);
			this._bloodStrip3.dispose();
			this._bloodStrip3 = null;
		}
		if(this._bloodContainer && this._bloodContainer.parent)
		{
			this._bloodContainer.parent.removeChild(this._bloodContainer);
			this._bloodContainer = null;
		}
		if(this._elementSkillEffect != null)
		{
			Manager.pool.push(this._elementSkillEffect);
			this._elementSkillEffect = null;
		}
		if(this._elementBuff != null)
		{
			Manager.pool.push(this._elementBuff);
			this._elementBuff = null;
		}
		this._aliveGameObjectInfo = null;
	}

	protected start():void
	{
		super.start();
		this.createAction();
		this._elementSkillEffect = Manager.pool.create(ElementSkillEffect, this);
		let type:number = this._aliveGameObjectInfo.getType();
		if(type != GameObjectType.PET || type != GameObjectType.SELF_PET) this._elementBuff = Manager.pool.create(ElementBuffAnimation, this);
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawPosition")) this.drawPosition();
		if(this.isInvalid("drawColorFilter")) this.drawColorFilter();
		if(this.isInvalid("drawSkill")) this._elementSkillEffect.drawSkill();
		if(this.isInvalid(InvalidationType.GO_BUFF)) this.drawBuff();
	}

	/**
	 * 填加进场景中执行 
	 */	
	protected reset():void
	{
		this.eventBlood();
		this.eventAliveFlag();
		this.eventAction();
		this.eventDirection();
		this.initBuff();
		super.reset();
	}

	private drawPosition():void
	{
		if(Manager.model.getMap().isAlphaPoint(this._info.x,this._info.y))this.alpha = 0.5
		else this.alpha = 1;
		Manager.control.getMap().startSort(this);
	}

	protected drawAll():void
	{
		super.drawAll();
		this.drawBuff();
	}

	private drawBuff():void
	{
		if(this._elementBuff == null) return;
		this._elementBuff.drawBuff();
		this._hasChangeBuff = false;
	}

	public updateBuff(buff:BuffCVO, isAdd:boolean):void
	{
		if(this._elementBuff == null) return;
		this.hasChangeBuff = this._elementBuff.hasChange(buff,isAdd);
	}

	private initBuff():void 
	{
		if(this._elementBuff == null) return;
		if(this._aliveGameObjectInfo.buffLst.length != 0) 
		{
			let len:number = this._aliveGameObjectInfo.buffLst.length;
			let one:BuffCVO;
			for(let i:number = 0; i < len; i++)
			{
				one = this._aliveGameObjectInfo.buffLst[i];
				if(!this._hasChangeBuff) this.hasChangeBuff = this._elementBuff.hasChange(one, true);
				else this._elementBuff.hasChange(one, true);
			}
		}
	}

	public eventAliveFlag():void
	{
		this._action.stopWalk();
		if(this._elementBuff)
		{
			this.hasChangeBuff = true;
			this._elementBuff.readyPlayCVO = null;
		}
	}

	public eventPosition():void
	{
		super.eventPosition();
		if(this._elementBuff) this._elementBuff.movePosition();
		this.invalidate("drawPosition");
	}

	protected createAction():void
	{
		this._action = Manager.pool.create(Action,this._aliveGameObjectInfo);
	}

	public stopWalk():void
	{
		this._action.stopWalk();
	}

	public eventNickname():void
	{
		
	}

	public eventAction():void
	{
		
	}

	public eventBlood():void
	{
	}

	public eventBattleFlag(oldFlag?:boolean):void
	{
	}

	public eventWalk(path:egret.Point[],walkType:number,complete?:Function,completeTarget?:any):void
	{
		this._action.walk(path, walkType, complete, completeTarget);
	}

	public eventStopWalk():void
	{
		this._action.stopWalk();
	}

	public eventDirection():void
	{

	}

	public eventColorFilter():void
	{
		this.invalidate("drawColorFilter");
	}

	protected drawColorFilter():void
	{
		
	}

	public eventSct(sctType:number, value:number, pos:egret.Point, direction:number = 0):void
	{
		Manager.pool.create(SCTView, sctType, value, pos, direction);
	}

	public eventPlayBomb(target:AliveGameObjectInfo, bombIndex:number, delayTime:number=0):void
	{
		let tpos:egret.Point = target.getBombShootPos();
		let pos:egret.Point = this._aliveGameObjectInfo.getBombShootPos();
		let angle:number = PointUtil.getAngle(pos.x,pos.y,tpos.x,tpos.y);
		let speed:number = 0.8;
		let time:number = egret.Point.distance(pos, tpos) / speed;
		if(delayTime == 0) this.playBomb(bombIndex,pos,tpos,angle,time);
		else this.delayPlayBomb(delayTime,bombIndex,pos,tpos,angle,time);
	}

	protected delayPlayBomb(delay:number,curBomb:number,pos:egret.Point,tpos:egret.Point,angle:number,time:number):void
	{
		egret.clearTimeout(this._bombDelayTime);
		this._bombDelayTime = egret.setTimeout(this.playBomb,this,delay,curBomb,pos,tpos,angle,time);
	}
	
	protected confirmPlayBomb(curBomb:number,pos:egret.Point,tpos:egret.Point,angle:number,time:number):void
	{
		this.playBomb(curBomb,pos,tpos,angle,time);
	}
	
	protected playBomb(curBomb:number,pos:egret.Point,tpos:egret.Point,angle:number,time:number):void
	{
		let animation:Animation = Manager.animation.createBombAnimation(curBomb);
		// Manager.layer.effectTopLayer.addChild(animation);
		Manager.layer.addChildToNodeByType(animation, animation.url, 1);
		ObjectUtil.rotateAroundExternalPoint(animation, pos.x, pos.y, 0, 0, angle);
		egret.Tween.get(animation).to({x:tpos.x, y:tpos.y}, time).call(this.bombComplete, this, [animation]);
	}

	private bombComplete(bomb:Animation):void
	{
		Manager.pool.push(bomb);
	}

	protected hideStrip():void
	{
		if(this._bloodContainer && this._bloodContainer.parent)
		{
			this._bloodContainer.parent.removeChild(this._bloodContainer);
		}
		// if(this._bloodStrip3)this._bloodStrip3.setVisible(false);

	}
		
	protected showStrip():void
	{
		if(this._bloodContainer == null)
		{
			this._bloodContainer = ObjectUtil.createConainer(false,false);
			this.addChild(this._bloodContainer);
		}
		if(this._bloodStrip3 == null)
		{
			this._bloodStrip3 = new BloodStripView2(this._bloodContainer,this._bloodContainer,this._info as AliveGameObjectInfo)
			// this._bloodStrip = Manager.pool.create(BloodStripView, this._info);
		}
		// if(this._bloodStrip.parent == null) this.addChild(this._bloodStrip);
	}

	public eventSkillEffect(info:SkillEffectInfo):void
	{
		this._elementSkillEffect.effectInfo = info;
		this.invalidate("drawSkill");
	}

	protected disposeSelf():void
	{
		super.disposeSelf();
		clearTimeout(this._bombDelayTime);
		if(this._action != null)
		{
			Manager.pool.push(this._action);
			this._action = null;
		}
		// if(this._bloodStrip != null)
		// {
		// 	Manager.pool.push(this._bloodStrip);
		// 	this._bloodStrip = null;
		// }
		if(this._bloodStrip3)
		{
			this._bloodStrip3.dispose();
			this._bloodStrip3 = null;
		}
		if(this._bloodContainer && this._bloodContainer.parent)
		{
			this._bloodContainer.parent.removeChild(this._bloodContainer);
		}
		this._bloodContainer = null;
		if(this._elementSkillEffect != null)
		{
			Manager.pool.push(this._elementSkillEffect);
			this._elementSkillEffect = null;
		}
		if(this._elementBuff != null)
		{
			Manager.pool.push(this._elementBuff);
			this._elementBuff = null;
		}
		this._aliveGameObjectInfo = null;
	}
}