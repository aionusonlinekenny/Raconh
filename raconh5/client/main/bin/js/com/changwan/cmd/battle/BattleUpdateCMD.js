var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *author Anydo
 *create 2017-11-21
 *description
*/
var BattleUpdateCMD = /** @class */ (function (_super) {
    __extends(BattleUpdateCMD, _super);
    function BattleUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BATTLE_UPDATE;
        return _this;
    }
    BattleUpdateCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.skillID);
        pkg.writeShort(this.targetPosX);
        pkg.writeShort(this.targetPosY);
        pkg.writeInt64(this.targetID);
    };
    BattleUpdateCMD.prototype.receive = function (pi) {
        var attackID = pi.readInt64();
        var targetPosX = pi.readShort();
        var targetPosY = pi.readShort();
        var skillID = pi.readShort();
        var attack;
        var skill = SkillCVO.getCVO(skillID);
        if (skill.mainType == 2) {
            attack = Manager.model.getGameobject().getGameObject(attackID);
            if (attack)
                attack = attack.getPet();
        }
        else
            attack = Manager.model.getGameobject().getGameObject(attackID);
        if (attack != null) {
            this.processAttack(attack, skill);
            this.processAttackSkill(attack, skill);
            this.processAttackAction(attack, skill);
        }
        var attacked;
        var isMainTarget = true;
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var attackedID = pi.readInt64();
            var moveType = pi.readByte(); //移动类型 0 不移动 1 击退 2 击飞
            var newX = pi.readShort();
            var newY = pi.readShort();
            var ignoreHP = (pi.readByte() == 1);
            var newBlood = pi.readInt64();
            var hurtType = pi.readByte(); //伤害类型 1 闪避 2 普通 3 暴击 4 跳闪
            var hurtValue = pi.readInt(); //伤害值
            attacked = Manager.model.getGameobject().getGameObject(attackedID);
            if (attacked != null) {
                if (isMainTarget) {
                    if (attack != null) {
                        this.processAttackDirection(attack, attacked, skill);
                        this.processAttackSkillByDirection(attack, PointUtil.getAngle(attack.x, attack.y, attacked.x, attacked.y), skill);
                    }
                }
                this.processAttackedSkill(attack, attacked, skill);
                this.processAttacked(attack, attacked, skill, moveType, newX, newY);
                this.processAttactedSct(attack, attacked, hurtType, hurtValue);
                this.processAttackSkillBomb(attack, attacked, skill);
                if (attacked && attack && attack.isType(GameObjectType.SELF)) {
                    attacked.setHitedWhiteFilter();
                }
                isMainTarget = false; //第一个设为主目标，后面都为辅助目标
                attacked.attackID = attackID;
                if (!ignoreHP)
                    attacked.attrInfo.setValue(AttrDescType.HP, newBlood);
            }
        }
    };
    BattleUpdateCMD.prototype.processAttack = function (attack, skill) {
        attack.setBattleFlag(true); //攻击技能
        if (attack instanceof PlayerGameObjectInfo) {
            if (attack.isType(GameObjectType.SELF)) {
                var self_1 = Manager.model.self;
                if (self_1.target != null) {
                    if (self_1.selfPet != null && (self_1.selfPet.target != self_1.target)) {
                        self_1.selfPet.updateTarget(self_1.target);
                    }
                }
            }
        }
    };
    BattleUpdateCMD.prototype.processAttackSkill = function (attack, skill) {
        if (attack.isType(GameObjectType.SELF))
            return;
        if (!skill.selfNeedPlayEffect)
            return;
        attack.playSkillEffectInfo(skill, skill.effectSelfID);
    };
    BattleUpdateCMD.prototype.processAttackAction = function (attack, skill) {
        if (skill.action == 100)
            return; //不需要播放动作
        if (!attack.isType(GameObjectType.SELF) && attack.getAliveFlag()) {
            if (attack instanceof PlayerGameObjectInfo)
                attack.playRandomAttack();
            else
                attack.setActionStr(FigureAction.ATTACK1);
        }
    };
    BattleUpdateCMD.prototype.processAttackDirection = function (attack, attacked, skill) {
        if (attack.isType(GameObjectType.SELF))
            return;
        if (attack instanceof MonsterGameObjectInfo && attack.cvo.singleDic)
            return;
        var dir = Direction.getDir(attack.x, attack.y, attacked.x, attacked.y);
        if (attack instanceof MonsterGameObjectInfo && attack.cvo.grade == 2 && attack.cvo.isMaterialFireLong()) {
            if (dir == Direction.RIGHT_TOP || dir == Direction.RIGHT)
                dir = Direction.RIGHT_DOWN;
            else if (dir == Direction.LEFT_TOP || dir == Direction.LEFT)
                dir = Direction.LEFT_DOWN;
            attack.setDirection(dir);
            if (skill.mainType == 3) {
                Manager.control.getMaterialCopy().addMaterialEffect(attack);
            }
            return;
        }
        attack.setDirection(dir);
    };
    BattleUpdateCMD.prototype.processAttackSkillByDirection = function (attack, rotation, skill) {
        if (!skill.hasConfigEffect)
            return;
        if (attack.isType(GameObjectType.SELF))
            return;
        attack.playSkillEffectInfo(skill, skill.effectSelfID, rotation, true);
    };
    BattleUpdateCMD.prototype.processAttackedSkill = function (attack, attacked, skill) {
        if (attack == attacked)
            return;
        if (!skill.targetNeedPlayEffect)
            return;
        if (attack && !attack.isSelfGO && !attacked.isSelfGO)
            return;
        attacked.playSkillEffectInfo(skill, skill.effectTarID);
    };
    //** 处理回击和击退 */
    BattleUpdateCMD.prototype.processAttacked = function (attack, attacked, skill, moveType, newX, newY) {
        if (attack == attacked)
            return;
        attacked.setBattleFlag(true);
        if (attacked.isType(GameObjectType.SELF)) {
            var needHitBack = false;
            if (Manager.model.self.target == null)
                needHitBack = true;
            if ((attack != null) && (Manager.model.self.target == attack))
                needHitBack = true;
            if (needHitBack && !Manager.model.getAuto().autoHook && (attack != null) && attack.getAliveFlag()) {
                if (!attack.isType(GameObjectType.SELF)) {
                    if (Manager.model.self.selfPet != null) {
                        if (Manager.model.self.selfPet.canHit() && Manager.model.self.selfPet.target == null) {
                            Manager.model.self.selfPet.updateTarget(attack);
                        }
                    }
                }
            }
        }
        if (moveType && !(attacked.x == newX && attacked.y == newY)) {
            if (moveType == 1) {
                if (attack == null)
                    return;
                if (attacked instanceof MonsterGameObjectInfo)
                    attacked.beatBack(newX, newY);
            }
        }
    };
    BattleUpdateCMD.prototype.processAttackSkillBomb = function (attack, attacked, skill) {
        if (attack == null)
            return;
        if (attack.isType(GameObjectType.SELF))
            return;
        if (!attack.canPlayBomb2(attacked.x, attacked.y, skill))
            return;
        attack.playBomb(attacked, skill.bombIndex);
    };
    /**
     * 播放sct
     * @hurtType 伤害类型 1 闪避 2 普通 3 暴击
     */
    BattleUpdateCMD.prototype.processAttactedSct = function (attack, attacked, hurtType, hurtValue) {
        if (hurtType <= 0)
            return;
        if (Manager.global.lifecyclePause)
            return;
        if (attack && !attack.isSelfGO && attacked && !attacked.isSelfGO)
            return;
        var direction = attack ? PointUtil.getAngle(attack.x, attack.y, attacked.x, attacked.y) : 0;
        var sctType;
        switch (hurtType) {
            case 1:
                sctType = attacked.isType(GameObjectType.SELF) ? SCTConst.TYPE_DODGE : SCTConst.TYPE_MISS;
                break;
            case 2:
                if (attacked.isType(GameObjectType.SELF))
                    sctType = SCTConst.TYPE_HURT;
                else {
                    sctType = attack.isType(GameObjectType.SELF) ? SCTConst.TYPE_SKILL : SCTConst.TYPE_PET;
                }
                break;
            case 3:
                if (attacked.isType(GameObjectType.SELF))
                    sctType = SCTConst.TYPE_HURT_CRIT;
                else {
                    sctType = attack.isType(GameObjectType.SELF) ? SCTConst.TYPE_SKILL_CRIT : SCTConst.TYPE_PET_CRIT;
                }
                break;
            default:
                sctType = SCTConst.TYPE_SKILL;
                break;
        }
        attacked.playSCT(sctType, hurtValue, direction);
    };
    return BattleUpdateCMD;
}(BaseCMD));
//# sourceMappingURL=BattleUpdateCMD.js.map