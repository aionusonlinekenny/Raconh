var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 活跃Model
 * luzhihong
 * create 2017-11-22
 */
var ActivityModel = (function (_super) {
    __extends(ActivityModel, _super);
    function ActivityModel() {
        var _this = _super.call(this) || this;
        /*解析表*/
        // public parseCVOs(bytes:egret.ByteArray):void
        // {
        //     let tabCount:number = bytes.readByte();
        //     ActivityCVO.parse(bytes);
        //     ActivityScheduleCVO.parse(bytes);
        // }
        /*当前日常活跃度值*/
        _this._curDailyValue = 0;
        _this.cleanDailyStates();
        _this.cleanDailySchedules();
        return _this;
    }
    Object.defineProperty(ActivityModel.prototype, "curDailyValue", {
        get: function () { return this._curDailyValue; },
        set: function (value) {
            this._curDailyValue = value;
        },
        enumerable: true,
        configurable: true
    });
    /*清空日常奖励*/
    ActivityModel.prototype.cleanDailyStates = function () {
        this._dailyGetStates = [];
        this._dailyCounts = new Object();
    };
    /*清空日常阶段*/
    ActivityModel.prototype.cleanDailySchedules = function () {
        this._dailySchedules = [];
    };
    /*设置日常完成和领取状态*/
    ActivityModel.prototype.setDailyState = function (id, count, hasGet) {
        if (hasGet && this._dailyGetStates.indexOf(id) == -1)
            this._dailyGetStates.push(id);
        this._dailyCounts[id] = count;
    };
    /*设置日常阶段领取状态*/
    ActivityModel.prototype.setDailySchedule = function (id) {
        if (this._dailySchedules.indexOf(id) == -1)
            this._dailySchedules.push(id);
    };
    /*取日常领取状态*/
    ActivityModel.prototype.dailyHasGet = function (id) {
        return this._dailyGetStates.indexOf(id) != -1;
    };
    /*取日常领取状态*/
    ActivityModel.prototype.dailyFinishCount = function (id) {
        return this._dailyCounts[id] == null ? 0 : this._dailyCounts[id];
    };
    /*取日常阶段领取状态*/
    ActivityModel.prototype.dailyScheduleHasGet = function (id) {
        return this._dailySchedules.indexOf(id) != -1;
    };
    return ActivityModel;
}(egret.EventDispatcher));
__reflect(ActivityModel.prototype, "ActivityModel");
//# sourceMappingURL=ActivityModel.js.map