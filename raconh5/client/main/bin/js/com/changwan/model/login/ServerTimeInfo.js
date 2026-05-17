var ServerTimeInfo = /** @class */ (function () {
    function ServerTimeInfo() {
        this._startTime = 0;
        this._serverTime = 0;
        this._svrOpenTime = 0;
    }
    Object.defineProperty(ServerTimeInfo.prototype, "serverTime", {
        get: function () {
            // return this._serverTime + (new Date().getTime() - this._startTime);
            return this._serverTime + (egret.getTimer() - this._startTime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerTimeInfo.prototype, "svrOpenTime", {
        get: function () {
            return this._svrOpenTime;
        },
        enumerable: true,
        configurable: true
    });
    ServerTimeInfo.prototype.updateServerTime = function (time) {
        this._serverTime = time * 1000;
        this._startTime = egret.getTimer(); //new Date().getTime();
    };
    ServerTimeInfo.prototype.updateSeverOpenTime = function (time) {
        this._svrOpenTime = time;
    };
    Object.defineProperty(ServerTimeInfo.prototype, "serverOpenDays", {
        /**开服天数 */
        get: function () {
            var start = cw.DateUtil.getDateBySecs(this._svrOpenTime);
            var startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate()); //取当天0时
            var nowDate = cw.DateUtil.getDateBySecs(this.serverTime / 1000);
            var temp = cw.DateUtil.disDay(startDate, nowDate);
            var passDay = Math.ceil(temp);
            return passDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerTimeInfo.prototype, "todaySeconds", {
        /**今天秒数 */
        get: function () {
            var date = new Date(this.serverTime); //取当天0时
            return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        },
        enumerable: true,
        configurable: true
    });
    return ServerTimeInfo;
}());
//# sourceMappingURL=ServerTimeInfo.js.map