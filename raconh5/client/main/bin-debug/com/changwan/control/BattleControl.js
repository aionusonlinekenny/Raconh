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
 *create 2017-11-21
 *description
*/
var BattleControl = (function (_super) {
    __extends(BattleControl, _super);
    function BattleControl() {
        return _super.call(this) || this;
    }
    BattleControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.BATTLE_UPDATE, BattleUpdateCMD);
        Manager.socket.addCMD(Protocol.REVIVE_INFO, ReviveInfoCMD);
        Manager.socket.addCMD(Protocol.REVIVE_APPLY, ReviveApplyCMD);
        Manager.socket.addCMD(Protocol.REVIVE_UPDATE, ReviveUpdateCMD);
        Manager.socket.addCMD(Protocol.REVIVE_NOTICE, ReviveNoticeCMD);
        Manager.socket.addCMD(Protocol.POISONING_NOTICE, PoisoningNoticeCMD);
        Manager.socket.addCMD(Protocol.PET_ATTACK, PetAttackCMD);
    };
    /**请求复活人物
     * @param 复活类型 0原地 1复活点
     */
    BattleControl.prototype.reviveApply = function (type) {
        var cmd = Manager.socket.getCMD(Protocol.REVIVE_APPLY);
        cmd.type = type;
        cmd.send();
    };
    /** 人物攻击 */
    BattleControl.prototype.cmdPlayerAttack = function (target, skill, targetPosX, targetPosY) {
        if (targetPosX === void 0) { targetPosX = 0; }
        if (targetPosY === void 0) { targetPosY = 0; }
        var skillModel = Manager.model.getSkill();
        var self = Manager.model.self;
        skillModel.startCoolDownByGroupID(skill.cvo.groupID);
        skillModel.lastAttackTime = egret.getTimer();
        skillModel.commonCD = skill.cvo.commonColdDownTime;
        if (Manager.model.getAuto().autoHook) {
            skillModel.setAutoSkill();
        }
        self.setBattleFlag(true);
        if (target != null && skill != null && self.canPlayBomb2(target.x, target.y, skill.cvo)) {
            self.playBomb(target, skill.cvo.bombIndex);
        }
        var rotation = target ? PointUtil.getAngle(self.x, self.y, target.x, target.y) : 0;
        if (skill.cvo.selfNeedPlayEffect)
            self.playSkillEffectInfo(skill.cvo, skill.cvo.effectSelfID, rotation);
        this.playSkillShake(skill.cvo);
        this.playSkillConfigEffect(skill.cvo, rotation);
        var cmd = Manager.socket.getCMD(Protocol.BATTLE_UPDATE);
        cmd.skillID = skill.cvo.groupID;
        cmd.targetPosX = target ? target.x : targetPosX;
        cmd.targetPosY = target ? target.y : targetPosY;
        cmd.targetID = (target != null) ? target.id : 0;
        cmd.send();
    };
    BattleControl.prototype.playSkillShake = function (skillCVO) {
        if (skillCVO.shakeConfig == "")
            return;
        var arr = skillCVO.shakeConfig.split(",");
        Manager.control.getMap().view.setShake(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), arr[3] == "1");
    };
    BattleControl.prototype.playSkillConfigEffect = function (skillCVO, rotation) {
        if (skillCVO.hasConfigEffect)
            Manager.model.self.playSkillEffectInfo(skillCVO, 0, rotation, true);
    };
    /**宠物攻击
     * @param 技能id
     * @param 目标id
     */
    BattleControl.prototype.cmdPetAttack = function (skillID, targeID) {
        var cmd = Manager.socket.getCMD(Protocol.PET_ATTACK);
        cmd.skillID = skillID;
        cmd.targetID = targeID;
        cmd.send();
    };
    return BattleControl;
}(BaseControl));
__reflect(BattleControl.prototype, "BattleControl");
//# sourceMappingURL=BattleControl.js.map