/**
 * pzx
 * 充值活动
 * 18.1.19
 */
var RechargeActivityCVO = /** @class */ (function () {
    function RechargeActivityCVO() {
        this._curent = 0;
        /**可领奖次数 */
        this._num = 0;
    }
    RechargeActivityCVO.prototype.setCurent = function (value) {
        this._curent = value;
    };
    Object.defineProperty(RechargeActivityCVO.prototype, "curent", {
        /** 当前已领取次数 */
        get: function () {
            return this._curent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RechargeActivityCVO.prototype, "isReward", {
        /** 是否有奖可领，1为有*/
        get: function () {
            var i = this.num;
            if (i > 0) {
                return 1;
            }
            return i;
        },
        enumerable: true,
        configurable: true
    });
    RechargeActivityCVO.prototype.setmoney = function (value) {
        this._num = 0;
        if (this.type == RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE) {
            for (var i = value.length - 1; i > -1; i--) {
                if (value[i] == this.RMB) {
                    this._num++;
                }
            }
        }
        else {
            var money = 0;
            for (var i = value.length - 1; i > -1; i--) {
                money += value[i];
            }
            this._num = Math.floor(money / this.RMB);
        }
    };
    Object.defineProperty(RechargeActivityCVO.prototype, "num", {
        /** 可领奖次数 -1已领完,0为未充值,大于0有奖可领*/
        get: function () {
            if (this.maxCurent == 0) {
                return this._num - this._curent;
            }
            if (this._curent >= this.maxCurent) {
                return -1;
            }
            else {
                var i = this._num - this._curent;
                return i < 0 ? 0 : i;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 是否在活动时间内 */
    RechargeActivityCVO.prototype.getTimeOpen = function () {
        if (Manager.model.getLogin().serverTimeInfo.serverOpenDays > this.severOpenDay) {
            var timeRule = Manager.pool.create(TimeRuleVO, this.starTime);
            return timeRule.isEnough();
        }
        return false;
    };
    RechargeActivityCVO.parse = function (bytes) {
        this._cvos = {};
        var pageCount = bytes.readByte();
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new RechargeActivityCVO();
            item.id = bytes.readShort();
            item.type = bytes.readByte();
            item.starTime = bytes.readUTF();
            item.severOpenDay = bytes.readShort();
            item.RMB = bytes.readInt();
            item.rewards = bytes.readUTF();
            item.maxCurent = bytes.readByte();
            item.sort = bytes.readByte();
            this._cvos[item.id] = item;
        }
    };
    RechargeActivityCVO.getCvos = function (type) {
        var arr = [];
        for (var key in this._cvos) {
            if (this._cvos[key].type == type && this._cvos[key].getTimeOpen()) {
                arr.push(this._cvos[key]);
            }
        }
        arr = ArrayUtil.sortOn(arr, ["sort"]);
        return arr;
    };
    RechargeActivityCVO.getcvo = function (id) {
        return this._cvos[id];
    };
    RechargeActivityCVO.setCurent = function (id) {
        var cvo = this._cvos[id];
        if (cvo) {
            var n = cvo.curent;
            cvo.setCurent(n + 1);
        }
    };
    RechargeActivityCVO.setListinfo = function (any) {
        for (var key in any) {
            var cvo = this._cvos[key];
            if (cvo) {
                var n = any[key];
                cvo.setCurent(n);
            }
        }
    };
    RechargeActivityCVO.setmoneyInfo = function (type, value) {
        for (var key in this._cvos) {
            if (this._cvos[key].type == type) {
                var cvo = this._cvos[key];
                cvo.setmoney(value);
            }
        }
    };
    return RechargeActivityCVO;
}());
//# sourceMappingURL=RechargeActivityCVO.js.map