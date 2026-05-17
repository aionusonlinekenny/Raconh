var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 日常活动表
 * liangyan
 * create 2017-12-21
*/
var DailyActivityCVO = (function () {
    function DailyActivityCVO() {
        /**是否已经玩过 */
        this.isPlayed = false;
    }
    Object.defineProperty(DailyActivityCVO.prototype, "weekOpenDay", {
        /**时间（周几）0:周日 1:周一 依次类推 -1表示每天 多日则"/"隔开
         */
        get: function () {
            return this._weekOpenStr.split("/");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DailyActivityCVO.prototype, "condition", {
        /**开启条件 */
        get: function () {
            if (!this._condArr)
                this._condArr = ConditionVO.getVOList(this._condStr);
            return this._condArr;
        },
        enumerable: true,
        configurable: true
    });
    /**满足所有开启条件 */
    DailyActivityCVO.prototype.isAllCondSatisfy = function (showTips) {
        if (showTips === void 0) { showTips = false; }
        var conds = this.condition;
        var len = conds ? conds.length : 0;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = conds[i];
            if (!vo.isSatisfy(null, showTips))
                return false;
        }
        return true;
    };
    Object.defineProperty(DailyActivityCVO.prototype, "status", {
        /**活动状态 1进行中，2结束*/
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DailyActivityCVO.prototype, "time", {
        /**活动结束时间戳 */
        get: function () { return this._time; },
        enumerable: true,
        configurable: true
    });
    DailyActivityCVO.prototype.setTime = function (status, time) {
        if (this._status == status && this._time == time)
            return;
        this._status = status;
        this._time = time + (Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (this._status == DailyActivityCVO.STATE_END)
            Manager.model.getActIcon().removeID(this.id);
        else if (this.isAllCondSatisfy())
            Manager.model.getActIcon().addID(this.id);
    };
    DailyActivityCVO.prototype.parseOne = function (data) {
        this.id = data.readShort();
        this.actType = data.readShort();
        // this.preDesc = data.readUTF();
        this.resID = data.readShort();
        this.isOpen = data.readByte() == 1;
        this.name = data.readUTF();
        this.type = data.readByte();
        this.sortIndex = data.readByte();
        this.srvOpenDay = data.readShort();
        this._weekOpenStr = data.readUTF();
        this.iconLabel = data.readUTF();
        this.timeDesc = data.readUTF();
        this.startTime = data.readInt();
        this.endTime = data.readInt();
        this._condStr = data.readUTF();
        this.rewards = GainLossVO.parse(data.readUTF());
        this.ruleDesc = data.readUTF();
        this.session = data.readByte();
        this.viewStr = data.readUTF();
        this.needAni = data.readByte() == 1;
        this.nextID = data.readShort();
        this._status = 0;
    };
    DailyActivityCVO.parse = function (bytes) {
        DailyActivityCVO._cvos = {};
        var tableCount = bytes.readByte();
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new DailyActivityCVO();
            cvo.parseOne(bytes);
            DailyActivityCVO._cvos[cvo.id] = cvo;
        }
    };
    DailyActivityCVO.getCVO = function (id) {
        return DailyActivityCVO._cvos[id];
    };
    DailyActivityCVO.getAlwaysShowCVOs = function () {
        var result = [];
        var cvo;
        for (var key in DailyActivityCVO._cvos) {
            cvo = DailyActivityCVO._cvos[key];
            if (cvo.type == this.SHOW_TYPE_ALWAYS)
                result.push(cvo);
        }
        return result;
    };
    DailyActivityCVO.getShowCVO = function (type) {
        var result = [];
        var cvo;
        var showIDs = Manager.model.getActIcon().showIDs;
        var now = new Date(Manager.model.getLogin().serverTimeInfo.serverTime);
        var strArr;
        var openDayIsAdd = false;
        for (var key in DailyActivityCVO._cvos) {
            cvo = DailyActivityCVO._cvos[key];
            if (!cvo)
                continue;
            if (!cvo.isOpen)
                continue;
            if (showIDs.indexOf(cvo.id) != -1)
                continue;
            if (cvo.type != type)
                continue;
            if (type == DailyActivityCVO.SHOW_TYPE_ALWAYS) {
                result.push(cvo);
                continue;
            }
            if (Manager.model.getLogin().serverTimeInfo.serverOpenDays == cvo.srvOpenDay && openDayIsAdd == false) {
                result.push(cvo);
                openDayIsAdd = true;
                continue;
            }
            strArr = cvo.weekOpenDay;
            if (strArr.length > 0 && strArr[0] != "-1" && strArr.indexOf(String(now.getDay())) == -1)
                continue;
            if (!cvo.isAllCondSatisfy())
                continue;
            if (!cvo.isInTime)
                continue;
            result.push(cvo);
        }
        return result;
    };
    Object.defineProperty(DailyActivityCVO.prototype, "isInTime", {
        get: function () {
            if (this.type == DailyActivityCVO.SHOW_TYPE_ALWAYS)
                return true;
            if (this._status == DailyActivityCVO.STATE_END)
                return false;
            if (this._status == DailyActivityCVO.STATE_PRE)
                return false;
            var now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
            if (this._status == DailyActivityCVO.STATE_IN && this._time > 0)
                return now < this._time;
            if (this.startTime > 0 && this.endTime > 0) {
                var curSecond = Manager.model.getLogin().serverTimeInfo.todaySeconds;
                return curSecond >= this.startTime && curSecond < this.endTime;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**进行中 */
    DailyActivityCVO.STATE_IN = 1;
    /**结束 */
    DailyActivityCVO.STATE_END = 2;
    /**预告 */
    DailyActivityCVO.STATE_PRE = 3;
    /**下方固定显示的系统入口 */
    DailyActivityCVO.SHOW_TYPE_ALWAYS = 1;
    /**左侧需要通过任务或者时间判断进行显示的玩法图标 */
    DailyActivityCVO.SHOW_TYPE_NOTICE = 2;
    /**上方显示的各类运营活动和排行榜、分享图标 */
    DailyActivityCVO.SHOW_TYPE_YUNYING = 3;
    return DailyActivityCVO;
}());
__reflect(DailyActivityCVO.prototype, "DailyActivityCVO");
//# sourceMappingURL=DailyActivityCVO.js.map