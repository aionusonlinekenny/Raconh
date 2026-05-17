/**
 *author Anydo
 *create 2017-11-9
 *description 
*/
class AutoModel
{
    private _tempTime:number;
    private _randomHookPosArr:number[];
    private get self():SelfGameObjectInfo
    {
        return Manager.model.self;
    }
    private get skill():SkillModel
    {
        return Manager.model.getSkill();
    }
    /**
     * 是否挂机 
     */		
    private _autoHook:boolean;
    public get autoHook():boolean
    {
        return this._autoHook;
    }
    public set autoHook(value:boolean)
    {
        if(this._autoHook == value) return;
        if(value && !this.canAuto()) return;
        this._autoHook = value;
        if(this._autoHook) 
        {
            Manager.render.add(this.render, this);
            Manager.model.self.stopWalk();
        }
        else 
        {
            Manager.render.remove(this.render, this);
            if(Manager.model.self.getActionStr() == FigureAction.WALK)
            {
                Manager.model.self.stopWalk();
            }
        }
    }

    private _hookPos:egret.Point;
    public set hookPos(pos:egret.Point)
    {
        this._hookPos = pos;
        if(this._autoHook && this._hookPos) Manager.walk.moveTo(pos);
    }

    public constructor()
    {
        this._tempTime = 0;
        this._randomHookPosArr = ArrayUtil.parseStringToArray(MapCVO.getConfigData(MapCVO.CONFIG_RANDOM_HOOK_POS), ",");
    }

	private render(interval:number):void
	{
        this.skill.renderAutoHook();
        this._tempTime += interval;
        if(this._tempTime > 100)
        {
            this._tempTime = 0;
            this.updateHookTarget();
        }
	}

	private updateHookTarget():void
	{
        if(!Manager.model.getMap().mapDataLoadComplete) return;
        let self:SelfGameObjectInfo = Manager.model.self;
        if(!self.getAliveFlag()) return;
        if(self.isingState(BodyStateManger.ISING_JUMP)) return;
        if(self.isingState(BodyStateManger.ISING_SPRINT)) return;
        if(self.isingState(BodyStateManger.ISING_SLIDE)) return;
        if(self.isingState(BodyStateManger.ISING_KITE)) return;
        if(self.isingState(BodyStateManger.ISING_WATER)) return;
        let actionStr:string = self.getActionStr();
        if(actionStr == FigureAction.WALK) return;
        if(actionStr == FigureAction.SLIDE) return;
        if(actionStr == FigureAction.KITE) return;
        if(actionStr == FigureAction.WATER) return;
        if(FigureAction.isAttackAction(actionStr)) 
        {
            if(self.target == null) return;
            if(self.target != null && self.isInAttackRect()) return;
        }

        let bol:boolean = Manager.model.getGameobject().updateHookTarget();
        if(!bol)
        {
            if(this._hookPos != null)
            {
                // Manager.walk.moveTo(this._hookPos);
                if(this._randomHookPosArr.indexOf(Manager.model.getMap().mapCVO.type) == -1) Manager.walk.moveTo(this._hookPos);
                else
                {
                    let randomPos:egret.Point = GameUtil.getNearCanWalkRandomPos(this._hookPos.x, this._hookPos.y, 50, 0, 5);
                    Manager.walk.moveTo(randomPos);
                }
            }
            else
            {
                self.cancelAction();
            }
        }
	}

    private canAuto():boolean
    {
        if(!this.self.getAliveFlag())return false;//死亡不能挂机
        return true;
    }
}