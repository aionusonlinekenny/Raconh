/**
 * 活动时间解析
 * pzx
 * create 2018-1-22
 */
var TimeRuleVO = /** @class */ (function () {
    function TimeRuleVO() {
    }
    /**
    * 是否在时间范围内
    * @return
    */
    TimeRuleVO.prototype.isEnough = function () {
        return this._condition;
    };
    /**
     * 时间规则：
绝对时间：{date, {}} 或者 {date, {{Y,M,D}, {Y,M,D}}} ; {} 表示永久 {Y,M,D}表示年月日
开服天数：{open, {M, N}} 或者 {open, N} ; {M, N} 表示开服第M天到第N天， N >= M
合服天数：{merge, {M, N}} 或者 {merge, N}; {M, N} 表示合服第M天到第N天， N >= M
循环活动：{cycle, {N, I, K}}； {N, I, K} 表示开服N天开始，周期为I天，持续K天，如开服第三天到第四天，七天一轮，填 {cycle, {3,7,1}}
     */
    TimeRuleVO.prototype.reuse = function (content) {
        if (content != "") {
            var reg = /{|}| /g;
            content = content.replace(reg, "");
            var arr = content.split(",");
            this.type = arr[0];
            switch (this.type) {
                case TimeRuleVO.DATE:
                    var time = Manager.model.getLogin().serverTimeInfo.serverTime;
                    var starDate = new Date(Number(arr[1]), Number(arr[2]) - 1, Number(arr[3]));
                    var endData = new Date(Number(arr[4]), Number(arr[5]) - 1, Number(arr[6]));
                    this._condition = starDate.getTime() <= time && time <= endData.getTime();
                    break;
                case TimeRuleVO.OPEN:
                    var openTime = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
                    this._condition = Number(arr[1]) <= openTime && openTime <= Number(arr[2]);
                    break;
            }
        }
    };
    TimeRuleVO.prototype.unuse = function () {
        this.type = "";
        this._condition = false;
    };
    TimeRuleVO.prototype.dispose = function () { };
    /**
     * 绝对时间
     */
    TimeRuleVO.DATE = "date";
    /**开服天数 */
    TimeRuleVO.OPEN = "open";
    /**合服天数 */
    TimeRuleVO.MERGE = "merge";
    /** 循环活动*/
    TimeRuleVO.CYCLE = "cycle";
    return TimeRuleVO;
}());
//# sourceMappingURL=TimeRuleVO.js.map