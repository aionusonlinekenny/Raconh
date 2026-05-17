/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class ElementSkillEffect extends ElementBase
{
    // public effectInfo:SkillEffectInfo;
    private _effectInfo:SkillEffectInfo;
    public set effectInfo(value:SkillEffectInfo)
    {
        if(this._effectInfo != null)Manager.pool.push(this._effectInfo);
        this._effectInfo = value;
    }

    private _singleEffect:Animation;

    private _aliveGameObject:AliveGameObject;
    
    public constructor()
    {
        super();
    }

    public reuse(gameObject:GameObject):void
	{
        this._aliveGameObject = gameObject as AliveGameObject;
        super.reuse(gameObject);
	}

	public unuse():void
	{
        this.poolPushSingleEffect();
        if(this._effectInfo)
        {
            Manager.pool.push(this._effectInfo);
            this._effectInfo = null;
        }
        this._aliveGameObject = null;
	}

    private drawSkillSingleEffect():void
    {
        this.poolPushSingleEffect();
        var effID:number = this._effectInfo.effID;
        this._singleEffect = Manager.animation.createSkillAnimation(effID, 0, true, false);
        this._singleEffect.x = this._aliveGameObject.x;
        this._singleEffect.y = this._aliveGameObject.y;
        this._singleEffect.addEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.singleLoadFail, this);
        this._singleEffect.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
        var cvo:AnimationCVO = AnimationCVO.getCVO("" + effID);
        if(cvo != null)
        {
            // if(cvo.isInFeet) this._aliveGameObject.addChildAt(this._singleEffect, 0);
            // else this._aliveGameObject.addChild(this._singleEffect);
            if(cvo.isInFeet) Manager.layer.addChildToNodeByType(this._singleEffect, this._singleEffect.url, 2);
		    else Manager.layer.addChildToNodeByType(this._singleEffect, this._singleEffect.url, 1);
        }
    }
    
    private singleLoadFail(e:GlobalEvent):void
    {
        this.poolPushSingleEffect();
    }
    
    private playComplete(e:GlobalEvent):void
    {
        this.poolPushSingleEffect();
    }

    private poolPushSingleEffect():void
    {
        if(this._singleEffect == null) return;
        this._singleEffect.removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.singleLoadFail, this);
        this._singleEffect.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
        Manager.pool.push(this._singleEffect);
        this._singleEffect = null;
    }
    
    public drawSkill():void
    {
        if(this._effectInfo != null)
        {
            if(this._effectInfo.isConfig) this.drawSkillConfigEffect();
            else this.drawSkillSingleEffect();
            Manager.pool.push(this._effectInfo);
            this._effectInfo = null;
        }
    }
    
    private drawSkillConfigEffect():void
    {
        var cvo:SkillCVO = this._effectInfo.cvo;
        if(cvo == null)return;
        var aliveGameObjectInfo:AliveGameObjectInfo = this._aliveGameObject.info as AliveGameObjectInfo;
        
        var effects:ISkillConfigEffect[] = [];
        let len1:number = cvo.effectLineConfig.length;
        if(len1 > 0)
        {
            var correctRotation:boolean = GameObjectType.isPlayer(aliveGameObjectInfo.getType()) || GameObjectType.isMonster(aliveGameObjectInfo.getType());
            for(let i:number = 0; i < len1; i++)
            {
                effects.push(Manager.pool.create(SkillLineEffect, cvo.effectLineConfig[i], this._effectInfo.rotation, correctRotation));
            }
        }
        let len2:number = cvo.effectAreaConfig.length;
        if(len2 > 0)
        {
            for(let j:number = 0; j < len2; j++)
            {
                effects.push(Manager.pool.create(SkillAreaEffect, cvo.effectAreaConfig[j], this._effectInfo.rotation));
            }
        }
        effects.sort(this.effectSortFun);
        let effect:any;
        for(let k:number = 0; k < effects.length; k++)
        {
            effect = effects[k];
            effect.move(aliveGameObjectInfo.x, aliveGameObjectInfo.y);
            if(effect.getIsInFeet()) Manager.layer.addChildToNodeByType(effect, effect.url, 2);
		    else Manager.layer.addChildToNodeByType(effect, effect.url, 1);
        }
    }

    private effectSortFun(e1:ISkillConfigEffect, e2:ISkillConfigEffect):number
    {
        if(e1.getSortIndex() < e2.getSortIndex()) return 1;
        else if(e1.getSortIndex() > e2.getSortIndex()) return -1;
        return 0;
    }
    
    protected disposeSelf():void
    {
        super.disposeSelf();
        this.poolPushSingleEffect();
        if(this._effectInfo)
        {
            Manager.pool.push(this._effectInfo);
            this._effectInfo = null;
        }
        this._aliveGameObject = null;
    }
}