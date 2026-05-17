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
var SkillEvent = (function (_super) {
    __extends(SkillEvent, _super);
    function SkillEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // public static UPDATE_SKILL_LEVEL:string = "updateSkillLevel";
    SkillEvent.SKILL_UPDATE = "skillUpdate";
    SkillEvent.UPDATE_RUNE_LEVEL = "updateRuneLevel";
    SkillEvent.UPDARE_SELECT_SKILL = "updateSelectSkill";
    SkillEvent.NORMAL_SKILL_STATE_UPDATE = "normalSkillStateUpdate"; //普通技能栏锁定状态更新
    SkillEvent.CHECK_NEED_SHOW = "chenckNeedSHow";
    SkillEvent.UPDATE_SPECIAL_SKILL = "updateSpecialSkill";
    SkillEvent.UPDATE_BIANSHEN_SKILL = "updateBianShenSkill";
    SkillEvent.USE_SKILL = "useSkill";
    SkillEvent.UPDATE_MAGICAL_SWITCH_SKILL = "updateMagicalSwitchSkill";
    /**单个技能更新 */
    SkillEvent.SKILL_SINGLE_UPDATE = "SKILL_SINGLE_UPDATE";
    return SkillEvent;
}(BaseEvent));
__reflect(SkillEvent.prototype, "SkillEvent");
//# sourceMappingURL=SkillEvent.js.map