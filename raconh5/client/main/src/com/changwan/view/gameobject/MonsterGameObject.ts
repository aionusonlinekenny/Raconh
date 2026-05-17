/**
 *author Anydo
 *create 2017-11-2
 *update devlil 2017-11-08
 *description 
*/
class MonsterGameObject extends AliveGameObject
{
	private _txtName:egret.TextField;
	private _monsterGameObjectInfo:MonsterGameObjectInfo;
	private _elementShow:ElementMonsterAnimation;
	private _bossBlood2:BossBloodStrip2;
	
	private _dieRepelPosS:egret.Point;//每次贝塞尔运动的起点
	private _dieRepelPosH:egret.Point;//每次贝塞尔运动的参考点
	private _dieRepelPosE:egret.Point;//每次贝塞尔运动的终点

	private _showName:boolean;
	private set showName(value:boolean)
	{
		if(this._showName == value) return;
		this._showName = value;
		this.invalidate(InvalidationType.GO_NAME);
	}

	private _showBlood:boolean;
	private set showBlood(value:boolean)
	{
		if(this._showBlood == value) return;
		else if(value && this._monsterGameObjectInfo.isType(GameObjectType.MONSTER_BOSS)) return;
		this._showBlood = value;
		this.invalidate(InvalidationType.GO_BLOOD);
	}

	public constructor()
	{
		super();
	}

	public reuse(info:GameObjectInfo):void
	{
		this._monsterGameObjectInfo = info as MonsterGameObjectInfo;
		if(this._monsterGameObjectInfo.isType(GameObjectType.MONSTER_BOSS))
		{
			this._showName = true;
			this.showBossBlood(info);
		}
		super.reuse(info);
	}

	protected start():void
	{
		super.start();
		if(this._monsterGameObjectInfo.cvo.type != MonsterType.EMPTY) this._elementShow = Manager.pool.create(ElementMonsterAnimation, this);
		if(this._monsterGameObjectInfo.cvo.birthAlpha != -1)
		{
			this.alpha = this._monsterGameObjectInfo.cvo.birthAlpha / 100;
			let showTime:number = this._monsterGameObjectInfo.cvo.birthAlphaTime;
			if(showTime == -1) showTime = 1000;
			egret.Tween.get(this).to({alpha:1}, showTime);//.call(this.dieRepelComplete, this);
		}
	}

	public unuse():void
	{
		egret.Tween.removeTweens(this);
		super.unuse();
		ObjectUtil.remove(this);
		if(this._elementShow)
		{
			Manager.pool.push(this._elementShow);
			this._elementShow = null;
		}
		this._monsterGameObjectInfo = null;
		if(this._txtName)
		{
			Manager.pool.push(this._txtName);
			this._txtName = null;
		}
		this._showName = false;
		this._showBlood = false;
		this._dieRepelPosS = null;
		this._dieRepelPosH = null;
		this._dieRepelPosE = null;
		this.hideBossBlood();
	}

	protected createAction():void
	{
		this._action = Manager.pool.create(MonsterAction, this._aliveGameObjectInfo);
	}

	public getMonsterAnimation():MonsterAnimation
	{
		if(this._elementShow != null && this._elementShow.animation != null) return this._elementShow.animation;
		return null;
	}

	protected drawAll():void
	{
		super.drawAll();
		this.drawName();
		this.drawBlood();
		if(this._elementShow) this._elementShow.drawMonster();
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.GO_NAME)) this.drawName();
		if(this.isInvalid(InvalidationType.GO_BLOOD)) this.drawBlood();
		if(this.isInvalid(InvalidationType.GO_DEAD) && this._elementShow) this._elementShow.drawDead();
		if(this.isInvalid(InvalidationType.GO_ANIMATION) && this._elementShow) this._elementShow.drawMonster();
		if(this.isInvalid(InvalidationType.GO_ACTION) && this._elementShow) this._elementShow.drawAction();
		if(this.isInvalid(InvalidationType.GO_DIRECTION) && this._elementShow) this._elementShow.drawDirection();
	}

	private drawName():void
	{
		if(this._showName && this._monsterGameObjectInfo.cvo)
		{
			if(this._txtName == null)
			{
				this._txtName = Manager.pool.create(egret.TextField);
				this._txtName.text = this._monsterGameObjectInfo.cvo.name;
				this._txtName.width = this._txtName.textWidth;
				this._txtName.x = - this._txtName.width >> 1;
				this._txtName.y = -this._monsterGameObjectInfo.cvo.height - this._txtName.height;
				if(this._showBlood && this._bloodContainer) this._txtName.y -= this._bloodContainer.height + 5;
			}
			if(this._txtName.parent == null) this.addChild(this._txtName);
		}
		else
		{
			if(this._txtName != null && this._txtName.parent != null) this._txtName.parent.removeChild(this._txtName);
		}
	}

	private drawBlood():void
	{
		if(this._showBlood)
		{
			this.showStrip();
			if(this._showName && this._monsterGameObjectInfo.cvo) this._txtName.y = -this._monsterGameObjectInfo.cvo.height - this._txtName.height - this._bloodContainer.height - 5;
		}
		else this.hideStrip();
	}
		
	protected showStrip():void
	{
		super.showStrip();
		// this._bloodContainer.move(this._bloodContainer.width == 0 ? -39 : -this._bloodContainer.width >> 1, -this._monsterGameObjectInfo.cvo.height - this._bloodContainer.height);
		this._bloodContainer.x = this._bloodContainer.width == 0 ? -39 : -this._bloodContainer.width >> 1;
		this._bloodContainer.y = -this._monsterGameObjectInfo.cvo.height - this._bloodContainer.height;
	}

	public eventDirection():void
	{
		this.invalidate(InvalidationType.GO_DIRECTION);
	}

	public eventAction():void
	{
		this.invalidate(InvalidationType.GO_ACTION);
	}

	public eventAliveFlag():void
	{
		super.eventAliveFlag();
		if(!this._aliveGameObjectInfo.getAliveFlag())
		{
			this.playMonsterDeadAnimation();
			this.hideBossBlood();
		}
	}

	public eventBlood():void
	{
		if(this._showBlood && this._bloodStrip3) this._bloodStrip3.updateBlood();
		else if(this._bossBlood2) this._bossBlood2.updateBlood();
		//死亡击飞
		if(this._aliveGameObjectInfo.attrInfo.hp <= 0)
		{
			let showDieRepel:boolean = true;
			if(!this._monsterGameObjectInfo.cvo.canDieRepel) showDieRepel = false;
			if(this._monsterGameObjectInfo.attackID <= 0) showDieRepel = false;
			var attack:AliveGameObjectInfo = Manager.model.getGameobject().getGameObject(this._monsterGameObjectInfo.attackID) as AliveGameObjectInfo;
			if(attack == null) showDieRepel = false;
			if(showDieRepel) this.eventDieRepel(new egret.Point(attack.x, attack.y), false);
			else if(!this._monsterGameObjectInfo.cvo.deadNoHide) egret.Tween.get(this).to({alpha:0}, 1500);
		}
		super.eventBlood();
	}

	public eventStrip(value:boolean)
	{
		this.showBlood = value;
		this.showName = value;
	}

	public eventBeatBack(targetX:number, targetY:number):void
	{
		(this._action as MonsterAction).beatBack(targetX, targetY);
	}

	public eventDieRepel(attackPos:egret.Point, onlyJumpOnce:boolean):void
	{
		(this._action as MonsterAction).dieRepel(attackPos, onlyJumpOnce);
	}

	protected drawColorFilter():void
	{
		if(this._elementShow) this._elementShow.drawColorFilter();
	}

	public playMonsterDeadAnimation():void
	{
		let index:number = [4013, 4014].indexOf(this._monsterGameObjectInfo.cvo.id);//是否为经验副本雕像怪
		if(index != -1)
		{
			let info:SceneEffGameObjectInfo = Manager.model.getGameobject().getSceneEffByCvoId([10017, 10016][index]);
			if(info) info.playShow();
			return;
		}

		let deadEffect:number = Number(this._monsterGameObjectInfo.cvo.deadEffect);
		if(deadEffect > 0)
		{
			let animation:Animation = Manager.animation.createSkillAnimation(deadEffect);
			animation.move(this._monsterGameObjectInfo.x, this._monsterGameObjectInfo.y);
			// Manager.layer.effectTopLayer.addChild(animation);
			Manager.layer.addChildToNodeByType(animation, animation.url, 1);
		}
	}

	/**
	 * 填加进场景中执行 
	 */	
	protected reset():void
	{
		super.reset();
		this.invalidate(InvalidationType.GO_ANIMATION);
	}

	public markDead():void
	{
		if(this._elementShow) this._elementShow.markDead();
	}

    //==============================↓↓↓↓↓↓↓↓死亡击飞动画↓↓↓↓↓↓↓↓==================================
    private DIE_REPEL_TIME1:number = 400;
    private DIE_REPEL_TIME2:number = 250;
    private DIE_REPEL_TIME3:number = 150;
    private DIE_REPEL_TIME4:number = 700;
    //贝塞尔
    public get factor():number {return 0;}
    public set factor(value:number) 
    {
        this.x = (1 - value) * (1 - value) * this._dieRepelPosS.x + 2 * value * (1 - value) * this._dieRepelPosH.x + value * value * this._dieRepelPosE.x;
        this.y = (1 - value) * (1 - value) * this._dieRepelPosS.y + 2 * value * (1 - value) * this._dieRepelPosH.y + value * value * this._dieRepelPosE.y;
    }
	/** 死亡击飞(弹跳1次) */
	public dieRepelBezier1(p0:egret.Point, p1:egret.Point, p2:egret.Point):void
	{
		this._shadow.visible = false;
		this._dieRepelPosS = p0;
		this._dieRepelPosH = p1;
		this._dieRepelPosE = p2;
		egret.Tween.get(this).to({factor: 1}, this.DIE_REPEL_TIME1).call(this.dieRepelComplete, this);
	}
	/** 死亡击飞(弹跳3次) */
	public dieRepelBezier2(p0:egret.Point, ph1:egret.Point, p1:egret.Point, ph2:egret.Point, p2:egret.Point, p3:egret.Point):void
	{
		this._shadow.visible = false;
		this._dieRepelPosS = p0;
		this._dieRepelPosH = ph1;
		this._dieRepelPosE = p1;
		egret.Tween.get(this).to({factor: 1}, this.DIE_REPEL_TIME1).call(this.dieRepelComplete2, this, [p1, ph2, p2, p3]);
	}
	private dieRepelComplete2(p0:egret.Point, p1:egret.Point, p2:egret.Point, p3:egret.Point):void
    {
        this._dieRepelPosS = p0;
		this._dieRepelPosH = p1;
		this._dieRepelPosE = p2;
		egret.Tween.get(this).to({factor: 1}, this.DIE_REPEL_TIME2).call(this.dieRepelComplete3, this, [p3]);
    }
	private dieRepelComplete3(p:egret.Point):void
    {
		egret.Tween.get(this).to({x:p.x, y:p.y}, this.DIE_REPEL_TIME3)
							 .to({alpha:0}, this.DIE_REPEL_TIME4).call(this.dieRepelComplete, this);
    }
	private dieRepelComplete():void
    {
		this.visible = false;
    }
    //==============================↑↑↑↑↑↑↑↑死亡击飞动画↑↑↑↑↑↑↑↑==================================

	//==============================↓↓↓↓↓↓↓↓boss类怪物血条↓↓↓↓↓↓↓↓==================================
	private showBossBlood(info:GameObjectInfo):void
	{
		if(!this._bossBlood2) this._bossBlood2 = Manager.view.show(ViewID.BossBloodStrip, info);
	}

	private hideBossBlood():void
	{
		if(this._bossBlood2) Manager.view.hide(ViewID.BossBloodStrip);
		this._bossBlood2 = null;
	}
	//==============================↑↑↑↑↑↑↑↑boss类怪物血条↑↑↑↑↑↑↑↑==================================

	protected disposeSelf():void
	{
		egret.Tween.removeTweens(this);
		super.disposeSelf();
		if(this._elementShow)
		{
			Manager.pool.push(this._elementShow);
			this._elementShow = null;
		}
		if(this._txtName != null)
		{
			Manager.pool.push(this._txtName);
			this._txtName = null;
		}
		this._monsterGameObjectInfo = null;
		this._showName = false;
		this._showBlood = false;
		this._dieRepelPosS = null;
		this._dieRepelPosH = null;
		this._dieRepelPosE = null;
		this.hideBossBlood();
	}
}