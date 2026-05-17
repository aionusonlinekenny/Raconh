/**
 * devil
 * create 2017-11-01
 */
class SelfAction extends PlayerAction
{
    public get self():SelfGameObjectInfo{ return (this._info as SelfGameObjectInfo); }

    protected walkComplete():void
	{
		super.walkComplete();
        this.checkAttack();
        // if(this.checkAttack2())
        // {
        //     this.initAttack();
        //     this.startBattle();
        // }
	}

    public startBattle():void
    {
        Manager.render.add(this.battleUpdate,this);
    }

    public stopBattle():void
    {
        Manager.render.remove(this.battleUpdate,this);
    }

    private checkAttack2():boolean
    {
        let that = this;
        if(that.self.target == null)return false;
        if(!Manager.model.getAuto().autoHook)return false;
        if(!that.self.canHit(false,true))return false;
        if(!(that.self.target instanceof AliveGameObjectInfo)) return false;
        if(!(that.self.target as AliveGameObjectInfo).canHited(false)) return false;
        if(!that.self.isInAttackRect()) return false;
        return true;


        //   if(!this.self.getAliveFlag()) return;
        // if(this.self.target == null) return;
        // if(!Manager.model.getAuto().autoHook) return;
        // if(!Manager.model.getMap().mapDataLoadComplete) return;
        // if(!this.self.canHit(false,true)) return;
        // if(this.inMove) return;
        // if(!(this.self.target instanceof AliveGameObjectInfo)) return;
        // if(!(this.self.target as AliveGameObjectInfo).canHited(false)) return;
        // if(!this.self.isInAttackRect()) return;
        // this.initAttack();
    }

    private battleUpdate(interval:number):void
    {
        this.renderPlayerAutoHook2();
        this.renderPetAutoHook2();
    }

    private renderPlayerAutoHook2():void
	{
        let that = this;
        if(!Manager.model.getSkill().canHitByCommonCD())return;//公共CD时间
        if(!FigureAction.isAttackAction(that.self.getActionStr())) return;
        if(that.self.target == null) return;
        if(!(that.self.target instanceof AliveGameObjectInfo)) return;
        if(!(that.self.target as AliveGameObjectInfo).canHited(false)) return;
        let skill:SkillModel = Manager.model.getSkill();
        if(!skill.canHitBySkill(skill.currentSkill, false))
        {
            skill.setAutoSkill();
        }
        if(skill.currentSkill.cvo.running) return;
        if(!skill.currentSkill.cvo.checkCanHitByGameObjectType(that.self.target.getType())) return;
        if(!that.self.isInAttackRect()) return;
        Manager.control.getBattle().cmdPlayerAttack(that.self.target as AliveGameObjectInfo, skill.currentSkill);
        that.self.setDirection(Direction.getDir(that.self.x, that.self.y, that.self.target.x, that.self.target.y));
    }


    private renderPetAutoHook2():void
	{
        let that = this;
        if(that.self.selfPet == null) return;
        if(!that.self.selfPet.canHit()) return;
        if(!FigureAction.isAttackAction(that.self.getActionStr())) return;
        if(that.self.selfPet.target == null) return;
        if(!that.self.selfPet.isInAttackRect()) return;
        Manager.model.getSkill().lastPetAttackTime = egret.getTimer();
        that.self.selfPet.setDirection(Direction.getDir(that.self.selfPet.x, that.self.selfPet.y, that.self.selfPet.target.x, that.self.selfPet.target.y));
    }

    private checkAttack():void
    {
        let that = this;
        if(!that.self.getAliveFlag()) return;
        if(that.self.target == null) return;
        if(!Manager.model.getAuto().autoHook) return;
        if(!Manager.model.getMap().mapDataLoadComplete) return;
        if(!that.self.canHit(false,true)) return;
        if(that.inMove) return;
        if(!(that.self.target instanceof AliveGameObjectInfo)) return;
        if(!(that.self.target as AliveGameObjectInfo).canHited(false)) return;
        if(!that.self.isInAttackRect()) return;
        that.initAttack();
    }

    private initAttack():void
    {
        if(!FigureAction.isAttackAction(this.self.getActionStr()))
        {
            this.self.playRandomAttack();
        }
    }

    public stopWalk():void
	{
        if(this.inMove) Manager.control.getMap().cmdSelfWalkPosSync(this._info.x, this._info.y);
        super.stopWalk();
    }

	public cancel():void
	{
        if(this.inMove) Manager.control.getMap().cmdSelfWalkPosSync(this._info.x, this._info.y);
        super.cancel();
	}
}


