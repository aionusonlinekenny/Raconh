/**
 * 火眼金睛活动结算信息
 * liangyan
 * create 2018-03-27
*/
var FireEyeResultInfo = /** @class */ (function () {
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
//# sourceMappingURL=FireEyeResultInfo.js.map