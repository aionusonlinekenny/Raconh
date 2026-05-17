/**
 *author Anydo
 *create 2017-12-2
 *description 
*/
class SelfPetAciton extends PetAction
{
    private _battleTime:number;

    public get selfPet():SelfPetGameObjectInfo{ return (this._info as SelfPetGameObjectInfo); }
    /**
     * 打怪时与主人之间的最大距离
     */		
    private DIS_BATTLE:number = 400;
    
    public constructor()
    {
        super();
    }

    protected render(interval:number):boolean
    {
        // let interval:number = runTime - this._lastTickTime;
        this.renderBattle(interval);
		this.renderWalk(interval);
		this.renderBackToOwner(interval);
		// this._lastTickTime = runTime;
		return false;
    }
    
    private renderBattle(interval:number):void
    {
        this._battleTime += interval;
        if(this._battleTime < 1000) return;
        this._battleTime %= 1000;

        var target:GameObjectInfo;
        if(this.selfPet.canHit())
        {
            let self:SelfGameObjectInfo = Manager.model.self;
            if(self.target != null)
            {
                target = self.target;
            }
            else if(self.attackID != 0)
            {
                var ttarget:GameObjectInfo = Manager.model.getGameobject().getGameObject(self.attackID);
                if(ttarget) target = ttarget;
            }
            
            if(target) this.selfPet.updateTarget(target);
        }
    }

    protected walkComplete():void
	{
		super.walkComplete();
        this.checkAttack();
	}

    private checkAttack():void
    {
        if(!Manager.model.self.getAliveFlag()) return;
        if(this.selfPet.target == null) return;
        // if(!Manager.model.getAuto().autoHook) return;
        if(!Manager.model.getMap().mapDataLoadComplete) return;
        if(!this.selfPet.canHit()) return;
        if(this.inMove) return;
        if(!this.selfPet.isInAttackRect()) return;
        this.initAttack();
    }

    private initAttack():void
    {
        if(!FigureAction.isAttackAction(this.selfPet.getActionStr()))
        {
            this.selfPet.setActionStr("attack1");
        }
    }
}