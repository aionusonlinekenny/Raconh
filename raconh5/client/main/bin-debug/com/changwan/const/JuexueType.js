var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 18.2.26
 * 绝学type
 */
var JuexueType = (function () {
    function JuexueType() {
    }
    //=====================秘籍类型==============
    /**少林 */
    JuexueType.JUEXUE_ESOTERICA_1 = 1;
    /**武当 */
    JuexueType.JUEXUE_ESOTERICA_2 = 2;
    /**明教 */
    JuexueType.JUEXUE_ESOTERICA_3 = 3;
    /**江湖 */
    JuexueType.JUEXUE_ESOTERICA_4 = 4;
    return JuexueType;
}());
__reflect(JuexueType.prototype, "JuexueType");
//# sourceMappingURL=JuexueType.js.map