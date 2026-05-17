/**
 * 抄袭ArenaBattleUtil
 * liangyan
 * create 2018-04-17
*/
class DevilBattleUtil
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

    public static startWalkToCenter():void
    {
        this._selfInfo.setDirection(Direction.LEFT_DOWN);
        this._selfInfo.setActionStr(FigureAction.STAND);
        if(this._selfInfo.getPet())
        {
            this._selfInfo.getPet().setDirection(Direction.LEFT_DOWN);
            this._selfInfo.getPet().setActionStr(FigureAction.STAND);
        }

        this._enemyInfo.setDirection(Direction.RIGHT_TOP);
        this._enemyInfo.setActionStr(FigureAction.WALK);
        this._enemyInfo.walk([new egret.Point(this._enemyInfo.x,this._enemyInfo.y), Manager.model.getDevil().getEnemyTargetPos()], WalkType.WALK, this.walkComplete, this);
        if(this._enemyInfo.getPet())
        {
            this._enemyInfo.getPet().setDirection(Direction.RIGHT_TOP);
            this._enemyInfo.getPet().setActionStr(FigureAction.WALK);
            this._enemyInfo.getPet().walk([new egret.Point(this._enemyInfo.getPet().x,this._enemyInfo.getPet().y), Manager.model.getDevil().getEnemyPetTargetPos()], WalkType.WALK);
        }
    }

    private static walkComplete():void
    {
        this._tempTime = egret.setInterval(this.playOneAction, this, this.STEP_TIME);
        this._step = 2;
        let selfPos:egret.Point = Manager.model.getDevil().getSelfTargetPos();
        this._selfInfo.updatePostion(selfPos.x, selfPos.y);
        let enemyPos:egret.Point = Manager.model.getDevil().getEnemyTargetPos();
        this._enemyInfo.updatePostion(enemyPos.x, enemyPos.y);
        this.playOneAction();
    }
    
    public static playOneAction():void
    {
        if(!Manager.model.getDevil().isGrabing) return;
        
        this.battleUpdate(true);
        this.battleUpdate(false);

        this._step ++;
    }
    
    private static battleUpdate(isSelf:boolean):void
    {
        if(!Manager.model.getDevil().isGrabing) return;
        
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
        if(attacked.attrInfo.hp <= 0) Manager.model.getDevil().showResultView();
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
        this._selfInfo = Manager.model.getDevil().selfInfo;
        this._enemyInfo = Manager.model.getDevil().enemyInfo;
        this._selfView = this._selfInfo.view as PlayerGameObject;
        if(this._selfInfo.getPet()) this._selfPetView = this._selfInfo.getPet().view as PetGameObject;
        this._enemyView = this._enemyInfo.view as PlayerGameObject;
        if(this._enemyInfo.getPet()) this._enemyPetView = this._enemyInfo.getPet().view as PetGameObject;
    }
    
    public static clearData():void
    {
        this._step = 1;
        this._petSkill = null;
        egret.clearInterval(this._tempTime);
        this._selfInfo = this._enemyInfo = null;
        this._selfView = this._enemyView = null;
        this._selfPetView = this._enemyPetView = null;
    }
    
    private static STEP_TIME:number = 500;
}