var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 火眼金睛单关结算信息
 * liangyan
 * create 2018-03-22
*/
var FireEyeLevelResultInfo = (function () {
    function FireEyeLevelResultInfo() {
    }
    Object.defineProperty(FireEyeLevelResultInfo.prototype, "isSelfLead", {
        /**是否自己领先 */
        get: function () {
            return this.selfScore > this.enemyScore;
        },
        enumerable: true,
        configurable: true
    });
    return FireEyeLevelResultInfo;
}());
__reflect(FireEyeLevelResultInfo.prototype, "FireEyeLevelResultInfo");
//# sourceMappingURL=FireEyeLevelResultInfo.js.map