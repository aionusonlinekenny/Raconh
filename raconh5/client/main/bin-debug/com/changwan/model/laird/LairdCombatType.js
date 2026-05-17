var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LairdCombatType = (function () {
    function LairdCombatType() {
    }
    /**捕获 */
    LairdCombatType.COMBAT_CATCH = 0;
    /**解救 */
    LairdCombatType.COMBAT_RESCUE = 1;
    /**反抗 */
    LairdCombatType.COMBAT_REVOLT = 2;
    return LairdCombatType;
}());
__reflect(LairdCombatType.prototype, "LairdCombatType");
//# sourceMappingURL=LairdCombatType.js.map