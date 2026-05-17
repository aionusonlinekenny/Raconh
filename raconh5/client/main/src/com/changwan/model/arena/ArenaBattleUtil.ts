/**
 *author Anydo
 *create 2018-1-3
 *description 
*/
class ArenaBattleUtil
{
    private static _step:number;
    
    private static _petSkill:SkillCVO;
    
    private static _selfInfo:PlayerGameObjectInfo;
    private static _enemyInfo:PlayerGameObjectInfo;
    private static _selfView:PlayerGameObject;
    private static _selfPetView:PetGameObject;
    private static _enemyView:PlayerGameObject;
    private static _enemyPetView:PetGameObject;

    private static _tempTime:number;
    private static _tempTime2:number;

    public static startJumpToCenter():void
    {
        Manager.jump.jump([new egret.Point(1470,950)]);
        Manager.model.self.needCanYing = false;

        this._selfInfo.setDirection(Direction.RIGHT_TOP);
        this._selfInfo.setActionStr(FigureAction.JUMP);
        this._selfInfo.dispatchJumpSyn(new egret.Point(this._selfInfo.x,this._selfInfo.y), [Manager.model.getArena().getSelfTargetPos()]);
        if(this._selfInfo.getPet())
        {
            this._selfInfo.getPet().setDirection(Direction.RIGHT_TOP);
            this._selfInfo.getPet().setActionStr(FigureAction.WALK);
            this._selfInfo.getPet().walk([new egret.Point(this._selfInfo.getPet().x,this._selfInfo.getPet().y), Manager.model.getArena().getSelfPetTargetPos()], WalkType.WALK);
        }
        this._enemyInfo.setDirection(Direction.LEFT_DOWN);
        this._enemyInfo.setActionStr(FigureAction.JUMP);
        this._enemyInfo.dispatchJumpSyn(new egret.Point(this._enemyInfo.x,this._enemyInfo.y), [Manager.model.getArena().getEnemyTargetPos()]);
        if(this._enemyInfo.getPet())
        {
            this._enemyInfo.getPet().setDirection(Direction.LEFT_DOWN);
            this._enemyInfo.getPet().setActionStr(FigureAction.WALK);
            this._enemyInfo.getPet().walk([new egret.Point(this._enemyInfo.getPet().x,this._enemyInfo.getPet().y), Manager.model.getArena().getEnemyPetTargetPos()], WalkType.WALK);
        }
        
        this._tempTime2 = egret.setTimeout(this.jumpComplete, this, PlayerAction.T * 1000);
    }

    private static jumpComplete():void
    {
        egret.clearInterval(this._tempTime);
        this._tempTime = egret.setInterval(this.playOneAction, this, this.STEP_TIME);

        this._step = 2;
        let selfPos:egret.Point = Manager.model.getArena().getSelfTargetPos();
        this._selfInfo.updatePostion(selfPos.x, selfPos.y);
        let enemyPos:egret.Point = Manager.model.getArena().getEnemyTargetPos();
        this._enemyInfo.updatePostion(enemyPos.x, enemyPos.y);
        this.playOneAction();
    }
    
    public static playOneAction():void
    {
        if(!Manager.model.getArena().isPlaying) return;
        
        this.battleUpdate(true);
        this.battleUpdate(false);

        this._step ++;
    }
    
    private static battleUpdate(isSelf:boolean):void
    {
        if(!Manager.model.getArena().isPlaying) return;
        
        let battleCVO:ArenaBattleCVO = ArenaBattleCVO.getCVOByStep(this._step);
        let attack:PlayerGameObjectInfo = isSelf ? this._selfInfo : this._enemyInfo;
        let attacked:PlayerGameObjectInfo = isSelf ? this._enemyInfo : this._selfInfo;
        let skill:SkillCVO = this.getSkillCVO(isSelf, isSelf ? battleCVO.selfSkill : battleCVO.enemySkill);
        
        //攻击方动作、特效
        attack.setActionStr(isSelf ? battleCVO.selfAction : battleCVO.enemyAction);
        let rotation:number = attacked ? PointUtil.getAngle(attack.x,attack.y,attacked.x,attacked.y) : 0;
        if(skill.selfNeedPlayEffect) attack.playSkillEffectInfo(skill,skill.effectSelfID,rotation);
        if(isSelf) Manager.control.getBattle().playSkillShake(skill);
        if(skill.hasConfigEffect) attack.playSkillEffectInfo(skill,0,rotation,true);
        //攻击方宠物动作、特效
        if(attack.getPet()) 
        {
            attack.getPet().setActionStr(FigureAction.ATTACK1);
            let rotation2:number = attacked ? PointUtil.getAngle(attack.getPet().x, attack.getPet().y, attacked.x, attacked.y) : 0;
            attack.getPet().playSkillEffectInfo(this._petSkill,0,rotation2,true);
        }
        //受击方特效、血量、SCT
        if(skill.targetNeedPlayEffect) attacked.playSkillEffectInfo(skill, skill.effectTarID);
        let direction:number = attack ?  PointUtil.getAngle(attack.x,attack.y,attacked.x,attacked.y) : 0;
        let hurtCommon:number = this.getHurtValue(isSelf, isSelf ? battleCVO.selfComHurt : battleCVO.enemyComHurt);
        if(hurtCommon >0)
        {
            attacked.attrInfo.setValue(AttrDescType.HP, attacked.attrInfo.hp - hurtCommon);
            attacked.playSCT(isSelf ? SCTConst.TYPE_SKILL : SCTConst.TYPE_HURT, hurtCommon, direction);
        }
        let hurtSkill:number = this.getHurtValue(isSelf, isSelf ? battleCVO.selfSkillHurt : battleCVO.enemySkillHurt);
        if(hurtSkill > 0)
        {
            attacked.attrInfo.setValue(AttrDescType.HP, attacked.attrInfo.hp - hurtSkill);
            attacked.playSCT(isSelf ? SCTConst.TYPE_SKILL : SCTConst.TYPE_HURT, hurtSkill, direction - 60);
        }
        if(attacked.attrInfo.hp <= 0) Manager.model.getArena().showResultToolView();
    }

    private static getSkillCVO(selfAttack:boolean, skillFlag:number):SkillCVO
    {
        let career:number = selfAttack ? this._selfInfo.attrInfo.career : this._enemyInfo.attrInfo.career;
        let skillID:number = (career * 1000) + skillFlag;
        return SkillCVO.getCVO(skillID);
    }

    private static getHurtValue(selfAttack:boolean, hurtPercent:number):number
    {
        if(hurtPercent == 0) return 0;
        let result:number;
        if(selfAttack)
        {
            result = (hurtPercent / 100) * (this._selfInfo.attrInfo.fight / this._enemyInfo.attrInfo.fight) * this._enemyInfo.attrInfo.hpMax;
        }
        else
        {
            result = (hurtPercent / 100) * (this._enemyInfo.attrInfo.fight / this._selfInfo.attrInfo.fight) * this._selfInfo.attrInfo.hpMax;
        }
        return Math.ceil(result);
    }
    
    public static readyData():void
    {
        this._step = 1;
        this._petSkill = SkillCVO.getCVO(4001);
        this._selfInfo = Manager.model.getArena().selfInfo;
        this._enemyInfo = Manager.model.getArena().enemyInfo;
        // this._selfView = Manager.control.getMap().getGameObject(this._selfInfo) as PlayerGameObject;
        // if(this._selfInfo.getPet()) this._selfPetView = Manager.control.getMap().getGameObject(this._selfInfo.getPet()) as PetGameObject;
        // this._enemyView = Manager.control.getMap().getGameObject(this._enemyInfo) as PlayerGameObject;
        // if(this._enemyInfo.getPet()) this._enemyPetView = Manager.control.getMap().getGameObject(this._enemyInfo.getPet()) as PetGameObject;
        this._selfView = this._selfInfo.view as PlayerGameObject;
        if(this._selfInfo.getPet()) this._selfPetView = this._selfInfo.getPet().view as PetGameObject;
        this._enemyView = this._enemyInfo.view as PlayerGameObject;
        if(this._enemyInfo.getPet()) this._enemyPetView = this._enemyInfo.getPet().view as PetGameObject;
    }
    
    public static clearData():void
    {
        this._step = 1;
        this._petSkill = null;
        this.clearTempTimes();
        this._selfInfo = this._enemyInfo = null;
        this._selfView = this._enemyView = null;
        this._selfPetView = this._enemyPetView = null;
    }

    public static clearTempTimes():void
    {
        egret.clearInterval(this._tempTime);
        egret.clearInterval(this._tempTime2);
    }

    private static STEP_TIME:number = 500;
}