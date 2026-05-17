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
 * 排行榜事件
 * luzhihong
 * create 2017-11-03
 */
var RankEvent = (function (_super) {
    __extends(RankEvent, _super);
    function RankEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 更新膜拜列表
     */
    RankEvent.UPDATE_WORSHIP_LIST = "UPDATE_WORSHIP_LIST";
    /**
     * 更新排行数据
     */
    RankEvent.UPDATE_RANK_LIST = "UPDATE_RANK_LIST";
    return RankEvent;
}(BaseEvent));
__reflect(RankEvent.prototype, "RankEvent");
//# sourceMappingURL=RankEvent.js.map