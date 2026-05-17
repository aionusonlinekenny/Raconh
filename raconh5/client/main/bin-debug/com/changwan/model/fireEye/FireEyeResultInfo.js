var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 火眼金睛活动结算信息
 * liangyan
 * create 2018-03-27
*/
var FireEyeResultInfo = (function () {
    function FireEyeResultInfo() {
    }
    Object.defineProperty(FireEyeResultInfo.prototype, "isSelfWin", {
        /**是否自己胜利 */
        get: function () {
            return this.selfScore > this.enemyScore;
        },
        enumerable: true,
        configurable: true
    });
    return FireEyeResultInfo;
}());
__reflect(FireEyeResultInfo.prototype, "FireEyeResultInfo");
//# sourceMappingURL=FireEyeResultInfo.js.map