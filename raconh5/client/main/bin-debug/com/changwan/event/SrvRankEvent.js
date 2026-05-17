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
 * 冲榜竞技事件
 * pzx
 * create 2018-3-15
 */
var SrvRankEvent = (function (_super) {
    __extends(SrvRankEvent, _super);
    function SrvRankEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 更新排行数据
     */
    SrvRankEvent.SRVRANK_UPDATE_LIST = "SRVRANK_UPDATE_LIST";
    return SrvRankEvent;
}(BaseEvent));
__reflect(SrvRankEvent.prototype, "SrvRankEvent");
//# sourceMappingURL=SrvRankEvent.js.map