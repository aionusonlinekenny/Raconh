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
 * drq
 * 签到Model
 * 2018.3.23
 */
var QiandaoModel = (function (_super) {
    __extends(QiandaoModel, _super);
    function QiandaoModel() {
        var _this = _super.call(this) || this;
        _this._dailyList = []; //每日签到列表
        _this._totalList = []; //阶段列表
        _this._buqian = []; //签到返回结果
        _this._secResult = []; //阶段返回结果
        _this._todayCanGet = true; //当天是否还未领取
        var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays; //开服天数
        _this._today = (day % 30) == 0 ? 30 : day % 30;
        return _this;
    }
    //存
    QiandaoModel.prototype.setDailyList = function (id, state) {
        for (var i = 0; i < this._dailyList.length; i++) {
            if (this._dailyList[i][0] == id) {
                return;
            }
        }
        this._dailyList.push([id, state]);
    };
    QiandaoModel.prototype.setTotalList = function (day, state) {
        this._totalList.push([day, state]);
    };
    QiandaoModel.prototype.setBuqian = function (id, state) {
        this._buqian = [id, state];
    };
    QiandaoModel.prototype.setSecResult = function (sec, result) {
        this._secResult = [sec, result];
    };
    QiandaoModel.prototype.setTodayCanGet = function (bool) {
        this._todayCanGet = bool;
    };
    //读
    QiandaoModel.prototype.getDailyList = function () {
        return this._dailyList;
    };
    QiandaoModel.prototype.getTotalList = function () {
        return this._totalList;
    };
    QiandaoModel.prototype.getBuQian = function () {
        return this._buqian;
    };
    QiandaoModel.prototype.getSecResult = function () {
        return this._secResult;
    };
    QiandaoModel.prototype.getTodayCanGet = function () {
        return this._todayCanGet;
    };
    QiandaoModel.prototype.getToday = function () {
        return this._today;
    };
    return QiandaoModel;
}(egret.EventDispatcher));
__reflect(QiandaoModel.prototype, "QiandaoModel");
//# sourceMappingURL=QiandaoModel.js.map