var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 加载顺序等级，越大越高
 * Simon
 */
var ResPriorityType = (function () {
    function ResPriorityType() {
    }
    ResPriorityType.LOAD_LEVEL1 = 1;
    ResPriorityType.LOAD_LEVEL2 = 2;
    ResPriorityType.LOAD_LEVEL3 = 3;
    ResPriorityType.LOAD_LEVEL4 = 4;
    ResPriorityType.LOAD_LEVEL5 = 5;
    ResPriorityType.LOAD_LEVEL6 = 6;
    return ResPriorityType;
}());
__reflect(ResPriorityType.prototype, "ResPriorityType");
//# sourceMappingURL=ResPriorityType.js.map