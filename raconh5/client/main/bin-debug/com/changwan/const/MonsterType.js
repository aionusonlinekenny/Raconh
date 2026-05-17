var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-2
 *description
*/
var MonsterType = (function () {
    function MonsterType() {
    }
    /**
     * 空怪
     */
    MonsterType.EMPTY = 0;
    /**
     * 普通怪
     */
    MonsterType.COMMON = 1;
    /**
     * 友方怪
     */
    MonsterType.FRIEND = 2;
    return MonsterType;
}());
__reflect(MonsterType.prototype, "MonsterType");
//# sourceMappingURL=MonsterType.js.map