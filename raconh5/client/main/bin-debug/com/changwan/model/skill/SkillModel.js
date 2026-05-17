var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 *create 2017-11-14
 *description
*/
var SkillModel = (function (_super) {
    __extends(SkillModel, _super);
    function SkillModel() {
        var _this = _super.call(this) || this;
        /**
         * 记录当前使用的技能的公共CD时间
         */
        _this.commonCD = 0;
        _this.lastAttackTime = 0;
        _this.lastPetAttackTime = 0;
        _this.init();
        return _this;
    }
    Object.defineProperty(SkillModel.prototype, "careerSkills", {
        get: function () { return this._carerrSkills; },
        enumerable: true,
        configurable: true
    });
    /**根据类型返回职业技能 1：主动 0：被动 */
    SkillModel.prototype.getCareerSkillsByType = function (type) {
        if (type === void 0) { type = 1; }
        var result = [];
        var len = this._carerrSkills.length;
        for (var i = 0; i < len; i++) {
            if (this._carerrSkills[i].cvo.type == type)
                result.push(this._carerrSkills[i]);
        }
        if (result.length > 1)
            result.sort(function (a, b) { return (a.cvo.groupID > b.cvo.groupID ? 1 : -1); });
        return result;
    };
    SkillModel.prototype.init = function () {
        this.resetCareerSkills();
        this.self = Manager.model.self;
        var id = this.self.attrInfo.career * 1000 + 1;
        this.defaultSkill = this.currentSkill = new SkillInfo(SkillCVO.getCVO(id), 1);
        this.currentPetSkill = new SkillInfo(SkillCVO.getCVO(4001), 1);
    };
    SkillModel.prototype.resetCareerSkills = function () {
        this._carerrSkills = [];
    };
    SkillModel.prototype.parseHookSkills = function () {
        this._hookSkills = this.getCareerSkillsByType(1);
        if (this._hookSkills.length > 1)
            this._hookSkills.sort(function (a, b) { return (a.cvo.autoHookPriority < b.cvo.autoHookPriority ? 1 : -1); });
    };
    SkillModel.prototype.updateCareerSkills = function (info) {
        if (!info)
            return;
        var curInfo = this.getSkillInfoByGroupID(info.cvo.groupID);
        if (curInfo) {
            var index = this._carerrSkills.indexOf(curInfo);
            this._carerrSkills[index] = info;
        }
        else {
            this._carerrSkills.push(info);
            if (info.cvo.type == 1) {
                this.parseHookSkills();
                Manager.view.show(3 /* SkillGainNewView */, info.cvo.icon);
            }
        }
    };
    SkillModel.prototype.getSkillInfoByGroupID = function (groupID) {
        if (this.defaultSkill.cvo.groupID == groupID)
            return this.defaultSkill;
        for (var i = 0; i < this._carerrSkills.length; i++) {
            if (this._carerrSkills[i].cvo.groupID == groupID)
                return this._carerrSkills[i];
        }
        return null;
    };
    /**根据分组id获取被动技能状态 */
    SkillModel.prototype.getPassiveSkillStatus = function (groupID) {
        var cvo = SkillCVO.getCVO(groupID);
        if (cvo.type == 1)
            return -1;
        var info = this.getSkillInfoByGroupID(groupID);
        if (info)
            return SkillTipsType.HAS_ACT;
        else {
            var condition = new ConditionVO(cvo.upgradeCond);
            var loss = new GainLossVO(cvo.upgradeCost);
            var condValue = condition && condition.isSatisfy();
            var lossValue = loss && loss.isEnough();
            if (condValue && lossValue)
                return SkillTipsType.ACTIVE;
            else if (!condValue)
                return SkillTipsType.AWAKE;
            else if (!lossValue)
                return SkillTipsType.GO_SHOP;
        }
    };
    /**根据分组id获取战力 */
    SkillModel.prototype.getFightByGroupID = function (groupID) {
        var result = 0;
        var info = this.getSkillInfoByGroupID(groupID);
        if (info) {
            var cvos = SkillCVO.getCVOsByGroup(groupID);
            var len = cvos.length;
            for (var i = 0; i < len; i++) {
                if (this.getPassiveSkillStatus(cvos[i].groupID) == SkillTipsType.HAS_ACT)
                    result += cvos[i].addFightValue;
            }
            var formulaCvo = SkillFormulaCVO.getCVO(groupID, SkillFormulaType.FIGHT);
            result += formulaCvo.getFormulaResult(info.level);
        }
        return result;
    };
    /**检测是否可升级技能或激活被动 */
    SkillModel.prototype.checkTipsShow = function () {
        var curCoin = Manager.model.self.attrInfo.coin;
        var selfLvl = Manager.model.self.attrInfo.level;
        var infos = this.careerSkills.concat(this.defaultSkill);
        var info;
        //铜钱升级主动技能
        for (var i = 0; i < infos.length; i++) {
            info = infos[i];
            if (info.cvo.mainType != 1)
                continue;
            if (info.cvo.type == 0)
                continue;
            if (info.level >= selfLvl || info.isMaxLevel())
                continue;
            if (curCoin >= (info.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(info.level)))
                return true;
        }
        //道具激活被动技能
        var skillCvos;
        for (var i = 0; i < infos.length; i++) {
            info = infos[i];
            if (info.cvo.mainType != 1)
                continue;
            if (info.cvo.type == 0)
                continue;
            skillCvos = SkillCVO.getCVOsByGroup(info.cvo.groupID);
            for (var j = 0; j < skillCvos.length; j++) {
                if (this.getPassiveSkillStatus(skillCvos[j].groupID) == SkillTipsType.ACTIVE)
                    return true;
            }
        }
        return false;
    };
    SkillModel.prototype.startCoolDownByGroupID = function (groupID) {
        var cur = this.getSkillInfoByGroupID(groupID);
        if (cur == null)
            return;
        cur.startRunning();
        var coldTime = cur.cvo.commonColdDownTime;
        for (var i = 0; i < this._carerrSkills.length; i++) {
            if (this._carerrSkills[i] != cur) {
                this._carerrSkills[i].startCommonRunning(coldTime);
            }
        }
    };
    /**
     * 挂机时自动设置技能(没有处理冷却时间的技能)
     */
    SkillModel.prototype.setAutoSkill = function () {
        if (this.self.isBuffState(BodyStateManger.BUFF_CHEN_MO)) {
            this.currentSkill = this.defaultSkill;
            return;
        }
        if (this._hookSkills.length > 0) {
            var info = void 0;
            for (var i = 0; i < this._hookSkills.length; i++) {
                info = this._hookSkills[i];
                if (!info.cvo.running) {
                    this.currentSkill = info;
                    return;
                }
            }
        }
        this.currentSkill = this.defaultSkill;
    };
    SkillModel.prototype.setToDefaultSkill = function () {
        this.currentSkill = this.defaultSkill;
    };
    //this.currentSkill有问题的时候，临时纠正成默认技能
    SkillModel.prototype.correctCurrentSkill = function () {
        if (this.currentSkill == null || this.currentSkill.cvo == null) {
            this.setToDefaultSkill();
            return true;
        }
        return false;
    };
    SkillModel.prototype.canHitBySkill = function (skillInfo, showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        if (skillInfo == null)
            return false;
        var that = this;
        if (that.self.isBuffState(BodyStateManger.BUFF_XUAN_YUN)) {
            if (showMsg)
                FloatTips.addTips("????");
            return false;
        }
        if (that.self.isBuffState(BodyStateManger.BUFF_CHAO_FENG)) {
            if (showMsg)
                FloatTips.addTips("????");
            return false;
        }
        if (that.self.isBuffState(BodyStateManger.BUFF_CHEN_MO) && !skillInfo.cvo.isDefault) {
            if (showMsg)
                FloatTips.addTips("????");
            return false;
        }
        if (that.self.isingState(BodyStateManger.ISING_JUMP))
            return false;
        if (that.self.isingState(BodyStateManger.ISING_SPRINT))
            return false;
        if (that.self.isingState(BodyStateManger.ISING_SLIDE))
            return false;
        if (that.self.isingState(BodyStateManger.ISING_KITE))
            return false;
        if (that.self.isingState(BodyStateManger.ISING_WATER))
            return false;
        if (!skillInfo.cvo.isCommonCD && skillInfo.cvo.running)
            return false;
        if (that.self.target && !skillInfo.cvo.checkCanHitByGameObjectType(that.self.target.getType())) {
            if (that.self.target instanceof NPCGameObjectInfo)
                that.self.updateTarget(null);
            return false;
        }
        return true;
    };
    /**
     * 判断公共CD时间是否已过，能否攻击
     */
    SkillModel.prototype.canHitByCommonCD = function () {
        return (egret.getTimer() - this.lastAttackTime) >= this.commonCD;
    };
    /**
     * 宠物能否攻击。
     */
    SkillModel.prototype.canPetHitByCommonCD = function () {
        return (egret.getTimer() - this.lastPetAttackTime) >= this.currentPetSkill.coldDownTime;
    };
    SkillModel.prototype.renderAutoHook2 = function () {
        this.renderPlayerAutoHook2();
        this.renderPetAutoHook2();
    };
    SkillModel.prototype.renderAutoHook = function () {
        this.renderPlayerAutoHook();
        this.renderPetAutoHook();
    };
    SkillModel.prototype.renderPlayerAutoHook = function () {
        var that = this;
        if (!that.self.getAliveFlag())
            return;
        if (!that.self.canHit(false, true))
            return;
        if (!FigureAction.isAttackAction(that.self.getActionStr()))
            return;
        if (that.self.target == null)
            return;
        if (!(that.self.target instanceof AliveGameObjectInfo))
            return;
        if (!that.self.target.canHited(false))
            return;
        if (!that.canHitBySkill(that.currentSkill, false)) {
            that.setAutoSkill();
        }
        if (that.currentSkill.cvo.running)
            return;
        if (!that.currentSkill.cvo.checkCanHitByGameObjectType(that.self.target.getType()))
            return;
        if (!that.self.isInAttackRect())
            return;
        // that.startCoolDownByGroupID(that.currentSkill.cvo.groupID);
        // that.lastAttackTime = egret.getTimer();
        // that.commonCD = that.currentSkill.cvo.commonColdDownTime;
        Manager.control.getBattle().cmdPlayerAttack(that.self.target, that.currentSkill);
        that.self.setDirection(Direction.getDir(that.self.x, that.self.y, that.self.target.x, that.self.target.y));
    };
    SkillModel.prototype.renderPlayerAutoHook2 = function () {
        var that = this;
        if (!that.self.canHit(false, true))
            return;
        if (!FigureAction.isAttackAction(that.self.getActionStr()))
            return;
        if (that.self.target == null)
            return;
        if (!(that.self.target instanceof AliveGameObjectInfo))
            return;
        if (!that.self.target.canHited(false))
            return;
        if (!that.canHitBySkill(that.currentSkill, false)) {
            that.setAutoSkill();
        }
        if (that.currentSkill.cvo.running)
            return;
        if (!that.currentSkill.cvo.checkCanHitByGameObjectType(that.self.target.getType()))
            return;
        if (!that.self.isInAttackRect())
            return;
        Manager.control.getBattle().cmdPlayerAttack(that.self.target, that.currentSkill);
        that.self.setDirection(Direction.getDir(that.self.x, that.self.y, that.self.target.x, that.self.target.y));
    };
    SkillModel.prototype.renderPetAutoHook = function () {
        var that = this;
        if (that.self.selfPet == null)
            return;
        if (!that.self.selfPet.canHit())
            return;
        if (!FigureAction.isAttackAction(that.self.getActionStr()))
            return;
        if (that.self.selfPet.target == null)
            return;
        if (!that.self.selfPet.isInAttackRect())
            return;
        that.lastPetAttackTime = egret.getTimer();
        Manager.control.getBattle().cmdPetAttack(that.currentPetSkill.cvo.groupID, that.self.selfPet.target.id);
        that.self.selfPet.setDirection(Direction.getDir(that.self.selfPet.x, that.self.selfPet.y, that.self.selfPet.target.x, that.self.selfPet.target.y));
    };
    SkillModel.prototype.renderPetAutoHook2 = function () {
        var that = this;
        if (that.self.selfPet == null)
            return;
        if (!that.self.selfPet.canHit())
            return;
        if (!FigureAction.isAttackAction(that.self.getActionStr()))
            return;
        if (that.self.selfPet.target == null)
            return;
        if (!that.self.selfPet.isInAttackRect())
            return;
        that.lastPetAttackTime = egret.getTimer();
        Manager.control.getBattle().cmdPetAttack(that.currentPetSkill.cvo.groupID, that.self.selfPet.target.id);
        that.self.selfPet.setDirection(Direction.getDir(that.self.selfPet.x, that.self.selfPet.y, that.self.selfPet.target.x, that.self.selfPet.target.y));
    };
    return SkillModel;
}(egret.EventDispatcher));
__reflect(SkillModel.prototype, "SkillModel");
//# sourceMappingURL=SkillModel.js.map