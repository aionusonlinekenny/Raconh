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
 * 副本Event
 * luzhihong
 * create 2017-12-4
 */
var CopyEvent = (function (_super) {
    __extends(CopyEvent, _super);
    function CopyEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //单个副本更新
    CopyEvent.UPDATE_SINGLE = "UPDATE_SINGLE";
    //副本排行更新
    CopyEvent.UPDATE_RANK = "UPDATE_RANK";
    CopyEvent.UPDATE_BUY_COUNT = "UPDATE_BUY_COUNT";
    //*****************爬塔副本 start*******************//
    CopyEvent.UPDATE_TOWER_INFO = "UPDATE_TOWER_INFO";
    //*****************爬塔副本 end*******************//
    //*****************经验副本 start*******************//
    CopyEvent.EXP_INFO_UPDATE = "EXP_INFO_UPDATE";
    CopyEvent.EXP_WAVE = "EXP_WAVE";
    CopyEvent.EXP_INSPIRE = "EXP_INSPIRE";
    CopyEvent.EXP_KILLS = "EXP_KILLS";
    CopyEvent.EXP_GAINS = "EXP_GAINS";
    CopyEvent.EXP_DATA_INIT = "EXP_DATA_INIT";
    //*****************经验副本 end*******************//
    //*****************银币副本 start*******************//
    CopyEvent.SILVER_COOLING = "SILVER_COOLING";
    CopyEvent.SILVER_BOXES = "SILVER_BOXES";
    CopyEvent.SILVER_MINI = "SILVER_MINI";
    return CopyEvent;
}(BaseEvent));
__reflect(CopyEvent.prototype, "CopyEvent");
//# sourceMappingURL=CopyEvent.js.map