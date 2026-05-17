var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-1-3
 *description
*/
var ArenaBattleUtil = (function () {
    function ArenaBattleUtil() {
    }
    ArenaBattleUtil.startJumpToCenter = function () {
        Manager.jump.jump([new egret.Point(1470, 950)]);
        Manager.model.self.needCanYing = false;
        this._selfInfo.setDirection(Direction.RIGHT_TOP);
        this._selfInfo.setActionStr(FigureAction.JUMP);
        this._selfInfo.dispatchJumpSyn(new egret.Point(this._selfInfo.x, this._selfInfo.y), [Manager.model.getArena().getSelfTargetPos()]);
        if (this._selfInfo.getPet()) {
            this._selfInfo.getPet().setDirection(Direction.RIGHT_TOP);
            this._selfInfo.getPet().setActionStr(FigureAction.WALK);
            this._selfInfo.getPet().walk([new egret.Point(this._selfInfo.getPet().x, this._selfInfo.getPet().y), Manager.model.getArena().getSelfPetTargetPos()], WalkType.WALK);
        }
        this._enemyInfo.setDirection(Direction.LEFT_DOWN);
        this._enemyInfo.setActionStr(FigureAction.JUMP);
        this._enemyInfo.dispatchJumpSyn(new egret.Point(this._enemyInfo.x, this._enemyInfo.y), [Manager.model.getArena().getEnemyTargetPos()]);
        if (this._enemyInfo.getPet()) {
            this._enemyInfo.getPet().setDirection(Direction.LEFT_DOWN);
            this._enemyInfo.getPet().setActionStr(FigureAction.WALK);
            this._enemyInfo.getPet().walk([new egret.Point(this._enemyInfo.getPet().x, this._enemyInfo.getPet().y), Manager.model.getArena().getEnemyPetTargetPos()], WalkType.WALK);
        }
        this._tempTime2 = egret.setTimeout(this.jumpComplete, this, PlayerAction.T * 1000);
    };
    ArenaBattleUtil.jumpComplete = function () {
        egret.clearInterval(this._tempTime);
        this._tempTime = egret.setInterval(this.playOneAction, this, this.STEP_TIME);
        this._step = 2;
        var selfPos = Manager.model.getArena().getSelfTargetPos();
        this._selfInfo.updatePostion(selfPos.x, selfPos.y);
        var enemyPos = Manager.model.getArena().getEnemyTargetPos();
        this._enemyInfo.updatePostion(enemyPos.x, enemyPos.y);
        this.playOneAction();
    };
    ArenaBattleUtil.playOneAction = function () {
        if (!Manager.model.getArena().isPlaying)
            return;
        this.battleUpdate(true);
        this.battleUpdate(false);
        this._step++;
    };
    ArenaBattleUtil.battleUpdate = function (isSelf) {
        if (!Manager.model.getArena().isPlaying)
            return;
        var battleCVO = ArenaBattleCVO.getCVOByStep(this._step);
        var attack = isSelf ? this._selfInfo : this._enemyInfo;
        var attacked = isSelf ? this._enemyInfo : this._selfInfo;
        var skill = this.getSkillCVO(isSelf, isSelf ? battleCVO.selfSkill : battleCVO.enemySkill);
        //攻击方动作、特效
        attack.setActionStr(isSelf ? battleCVO.selfAction : battleCVO.enemyAction);
        var rotation = attacked ? PointUtil.getAngle(attack.x, attack.y, attacked.x, attacked.y) : 0;
        if (skill.selfNeedPlayEffect)
            attack.playSkillEffectInfo(skill, skill.effectSelfID, rotation);
        if (isSelf)
            Manager.control.getBattle().playSkillShake(skill);
        if (skill.hasConfigEffect)
            attack.playSkillEffectInfo(skill, 0, rotation, true);
        //攻击方宠物动作、特效
        if (attack.getPet()) {
            attack.getPet().setActionStr(FigureAction.ATTACK1);
            var rotation2 = attacked ? PointUtil.getAngle(attack.getPet().x, attack.getPet().y, attacked.x, attacked.y) : 0;
            attack.getPet().playSkillEffectInfo(this._petSkill, 0, rotation2, true);
        }
        //受击方特效、血量、SCT
        if (skill.targetNeedPlayEffect)
            attacked.playSkillEffectInfo(skill, skill.effectTarID);
        var direction = attack ? PointUtil.getAngle(attack.x, attack.y, attacked.x, attacked.y) : 0;
        var hurtCommon = this.getHurtValue(isSelf, isSelf ? battleCVO.selfComHurt : battleCVO.enemyComHurt);
        if (hurtCommon > 0) {
            attacked.attrInfo.setValue(AttrDescType.HP, attacked.attrInfo.hp - hurtCommon);
            attacked.playSCT(isSelf ? SCTConst.TYPE_SKILL : SCTConst.TYPE_HURT, hurtCommon, direction);
        }
        var hurtSkill = this.getHurtValue(isSelf, isSelf ? battleCVO.selfSkillHurt : battleCVO.enemySkillHurt);
        if (hurtSkill > 0) {
            attacked.attrInfo.setValue(AttrDescType.HP, attacked.attrInfo.hp - hurtSkill);
            attacked.playSCT(isSelf ? SCTConst.TYPE_SKILL : SCTConst.TYPE_HURT, hurtSkill, direction - 60);
        }
        if (attacked.attrInfo.hp <= 0)
            Manager.model.getArena().showResultToolView();
    };
    ArenaBattleUtil.getSkillCVO = function (selfAttack, skillFlag) {
        var career = selfAttack ? this._selfInfo.attrInfo.career : this._enemyInfo.attrInfo.career;
        var skillID = (career * 1000) + skillFlag;
        return SkillCVO.getCVO(skillID);
    };
    ArenaBattleUtil.getHurtValue = function (selfAttack, hurtPercent) {
        if (hurtPercent == 0)
            return 0;
        var result;
        if (selfAttack) {
            result = (hurtPercent / 100) * (this._selfInfo.attrInfo.fight / this._enemyInfo.attrInfo.fight) * this._enemyInfo.attrInfo.hpMax;
        }
        else {
            result = (hurtPercent / 100) * (this._enemyInfo.attrInfo.fight / this._selfInfo.attrInfo.fight) * this._selfInfo.attrInfo.hpMax;
        }
        return Math.ceil(result);
    };
    ArenaBattleUtil.readyData = function () {
        this._step = 1;
        this._petSkill = SkillCVO.getCVO(4001);
        this._selfInfo = Manager.model.getArena().selfInfo;
        this._enemyInfo = Manager.model.getArena().enemyInfo;
        // this._selfView = Manager.control.getMap().getGameObject(this._selfInfo) as PlayerGameObject;
        // if(this._selfInfo.getPet()) this._selfPetView = Manager.control.getMap().getGameObject(this._selfInfo.getPet()) as PetGameObject;
        // this._enemyView = Manager.control.getMap().getGameObject(this._enemyInfo) as PlayerGameObject;
        // if(this._enemyInfo.getPet()) this._enemyPetView = Manager.control.getMap().getGameObject(this._enemyInfo.getPet()) as PetGameObject;
        this._selfView = this._selfInfo.view;
        if (this._selfInfo.getPet())
            this._selfPetView = this._selfInfo.getPet().view;
        this._enemyView = this._enemyInfo.view;
        if (this._enemyInfo.getPet())
            this._enemyPetView = this._enemyInfo.getPet().view;
    };
    ArenaBattleUtil.clearData = function () {
        this._step = 1;
        this._petSkill = null;
        this.clearTempTimes();
        this._selfInfo = this._enemyInfo = null;
        this._selfView = this._enemyView = null;
        this._selfPetView = this._enemyPetView = null;
    };
    ArenaBattleUtil.clearTempTimes = function () {
        egret.clearInterval(this._tempTime);
        egret.clearInterval(this._tempTime2);
    };
    ArenaBattleUtil.STEP_TIME = 500;
    return ArenaBattleUtil;
}());
__reflect(ArenaBattleUtil.prototype, "ArenaBattleUtil");
//# sourceMappingURL=ArenaBattleUtil.js.map