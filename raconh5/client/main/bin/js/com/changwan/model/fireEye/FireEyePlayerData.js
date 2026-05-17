/**
 * 火眼金睛玩家数据
 * liangyan
 * create 2018-03-26
*/
var FireEyePlayerData = /** @class */ (function () {
    function FireEyePlayerData() {
        this.targets = [];
    }
    Object.defineProperty(FireEyePlayerData.prototype, "rate", {
        /**当前进度百分比 */
        get: function () {
            var sum = 0;
            var findNum = 0;
            var levelData = Manager.model.getFireEye().nextInfo.datas;
            var len = levelData ? levelData.length : 0;
            var targetLen = this.targets ? this.targets.length : 0;
            for (var i = 0; i < len; i++) {
                sum += levelData[i].num;
            }
            for (var j = 0; j < targetLen; j++) {
                findNum += this.targets[j].num;
            }
            return Math.round(findNum / sum * 100);
        },
        enumerable: true,
        configurable: true
    });
    return FireEyePlayerData;
}());
//# sourceMappingURL=FireEyePlayerData.js.map