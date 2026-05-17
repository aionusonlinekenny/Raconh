/**
 * pzx
 * 18.3.14
 * 天天返利cvo
 */
var DailyRebateCVO = /** @class */ (function () {
    function DailyRebateCVO() {
    }
    DailyRebateCVO.prototype.setReward = function () {
        this._isReward = true;
    };
    Object.defineProperty(DailyRebateCVO.prototype, "isReward", {
        /**
         * 是否已领取奖励
         */
        get: function () {
            return this._isReward;
        },
        enumerable: true,
        configurable: true
    });
    DailyRebateCVO.prototype.setCharge = function () {
        this._ischarge = true;
    };
    /**
     * 检测是否可领取
     */
    DailyRebateCVO.prototype.checkReward = function () {
        if (this._isReward)
            return false;
        return this._ischarge;
    };
    DailyRebateCVO.parse = function (bytes) {
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        var info;
        this._data = {};
        for (var i = 0; i < tableCount; i++) {
            info = new DailyRebateCVO();
            info.open_day = bytes.readShort();
            info.type = bytes.readByte();
            info.amount = bytes.readShort();
            info.loss = bytes.readUTF();
            if (info.type == 1) {
                //1为固定活动
                if (this._fixedDay < info.open_day) {
                    this._fixedDay = info.open_day;
                }
            }
            else if (info.type == 0) {
                if (!this._data[info.open_day])
                    this._loopDay++;
            }
            if (!this._data[info.open_day]) {
                this._data[info.open_day] = {};
            }
            this._data[info.open_day][info.amount] = info;
        }
    };
    DailyRebateCVO.setReward = function (prite) {
        var day = 2;
        var cvo = this._data[day][prite];
    };
    /**
     * 获取当天活动数列表
     * 注：(此活动入口与首充豪礼为前后置关系，游戏内激活了首充豪礼，并且为开服第二天或之后即可开启)
     *
     * @param day 开服天数
     */
    DailyRebateCVO.getcovs = function (day) {
        //if(day < 2) return null;//屏蔽，改为开服第１天可显示
        if (this._data[day]) {
            return this._data[day];
        }
        else {
            //取循环天数
            var i = day % this._loopDay;
            if (i == 0)
                i = this._loopDay;
            var d = this._fixedDay + i;
            return this._data[d];
        }
    };
    DailyRebateCVO._data = {};
    /** 固定活动的总天数  一定是从服务开始第n天开始，连续不间断，中间不加插循环*/
    DailyRebateCVO._fixedDay = 0;
    /** 可循环的总天数 */
    DailyRebateCVO._loopDay = 0;
    return DailyRebateCVO;
}());
//# sourceMappingURL=DailyRebateCVO.js.map