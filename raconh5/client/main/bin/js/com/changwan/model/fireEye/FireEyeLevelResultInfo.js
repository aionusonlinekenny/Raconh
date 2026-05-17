/**
 * 火眼金睛单关结算信息
 * liangyan
 * create 2018-03-22
*/
var FireEyeLevelResultInfo = /** @class */ (function () {
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
//# sourceMappingURL=FireEyeLevelResultInfo.js.map