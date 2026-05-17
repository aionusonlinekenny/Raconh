var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 技能公式类型
 * liangyan
 * create 2017-11-21
*/
var SkillFormulaType = (function () {
    function SkillFormulaType() {
    }
    /**伤害 */
    SkillFormulaType.DAMAGE = "dmg";
    /**激活/升级条件 */
    SkillFormulaType.CONDITION = "cond";
    /**消耗 */
    SkillFormulaType.LOSS = "loss";
    /**战力 */
    SkillFormulaType.FIGHT = "fc";
    return SkillFormulaType;
}());
__reflect(SkillFormulaType.prototype, "SkillFormulaType");
//# sourceMappingURL=SkillFormulaType.js.map