/**
 *author Anydo
 *create 2017-11-29
 *description 
*/
class SelfPetGameObjectInfo extends PetGameObjectInfo
{
    private _target:GameObjectInfo;
    public get target():GameObjectInfo
    {
        return this._target;
    }
    
    public unuse():void
    {
        super.unuse();
        this._target = null;
    }
    
    public get isSelfGO():boolean{ return true; }
    
    /** 更新目标 */		
    public updateTarget(value:GameObjectInfo):void
	{
		this._target = value;
		if(this._view != null) (this._view as SelfPetGameObject).eventTarget();
	}
    
    /**
     * 是否在攻击范围内 
     */		
    public isInAttackRect():boolean
    {
        let dis:number = egret.Point.distance(new egret.Point(this.x,this.y),new egret.Point(this._target.x,this._target.y));
        if(Manager.model.getSkill().currentPetSkill != null && dis <= Manager.model.getSkill().currentPetSkill.maxRange)return true;
        return false;
    }
    
    public canHit():boolean
    {
        if(!Manager.model.self.getAliveFlag()) return false;
        if(!this.owner.getBattleFlag()) return false;
        if(!Manager.model.getSkill().canPetHitByCommonCD()) return false;
        return true;
    }

    public getType():number 
    {
        return GameObjectType.SELF_PET; 
    }
    
    public setIsOut(value:boolean):void
    {
        if(this._isOut == value) return;
        this._isOut = value;
        if(this.isSelfGO)
        {
            if(this._isOut) 
            {
                Manager.model.self.setPet(this);
            }
            else
            {
                Manager.model.self.setPet(null);
            }
        }
    }
   
    public createGameObject():GameObject
	{
		if(this._view == null)this._view = Manager.pool.create(SelfPetGameObject, this)
		return this._view;
	}

	public dispose():void
	{
		super.dispose();
        this._target = null;
	}
}