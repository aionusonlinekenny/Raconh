var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 火眼金睛常量
 * liangyan
 * create 2018-04-03
*/
var FireEyeConst = (function () {
    function FireEyeConst() {
    }
    /**连胜奖励id */
    FireEyeConst.ID_LIAN_SHENG = 1;
    /**完胜奖励id */
    FireEyeConst.ID_WAN_SHENG = 2;
    return FireEyeConst;
}());
__reflect(FireEyeConst.prototype, "FireEyeConst");
//# sourceMappingURL=FireEyeConst.js.map