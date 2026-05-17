var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-2
 *description
*/
var MonsterGrade = (function () {
    function MonsterGrade() {
    }
    /**
     * 普通怪
     */
    MonsterGrade.COMMON = 1;
    /**
     * 精英怪
     */
    MonsterGrade.ELITE = 2;
    /**
     * BOSS怪
     */
    MonsterGrade.BOSS = 3;
    return MonsterGrade;
}());
__reflect(MonsterGrade.prototype, "MonsterGrade");
//# sourceMappingURL=MonsterGrade.js.map