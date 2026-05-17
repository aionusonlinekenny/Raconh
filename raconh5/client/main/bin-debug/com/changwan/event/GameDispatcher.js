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
 *author Anydo
 *create 2017-11-3
 *description
*/
var GameDispatcher = (function (_super) {
    __extends(GameDispatcher, _super);
    function GameDispatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //当天时间，
        _this._curTime = -1;
        return _this;
    }
    GameDispatcher.getInstance = function () {
        return this._instance;
    };
    /** 跨天刷新 */
    GameDispatcher.prototype.crossDay = function () {
        var second = this._curTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            this._curTime = DateUtil.getToDayTime();
            this.dispatchEvent(new GlobalEvent(GlobalEvent.CROSS_DAY_EVENT));
        }
    };
    //开始跨天计时
    GameDispatcher.prototype.starCrossTime = function () {
        this._curTime = DateUtil.getToDayTime();
        Manager.render.add(this.crossDay, this, 60000);
    };
    GameDispatcher._instance = new GameDispatcher();
    return GameDispatcher;
}(egret.EventDispatcher));
__reflect(GameDispatcher.prototype, "GameDispatcher");
//# sourceMappingURL=GameDispatcher.js.map