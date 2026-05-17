var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 技能tips类型
 * liangyan
 * create 2017-11-21
*/
var SkillTipsType = (function () {
    function SkillTipsType() {
    }
    /**觉醒 */
    SkillTipsType.AWAKE = 1;
    /**激活 */
    SkillTipsType.ACTIVE = 2;
    /**转到商店 */
    SkillTipsType.GO_SHOP = 3;
    /**已激活 */
    SkillTipsType.HAS_ACT = 4;
    return SkillTipsType;
}());
__reflect(SkillTipsType.prototype, "SkillTipsType");
//# sourceMappingURL=SkillTipsType.js.map