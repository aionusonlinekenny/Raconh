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
 * pzx
 * 18.4.17
 * 市场event
 */
var MarketEvent = (function (_super) {
    __extends(MarketEvent, _super);
    function MarketEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**玩家列表 */
    MarketEvent.MARKET_LIST_INFO_EVENT = "MARKET_LIST_INFO_EVENT";
    /**玩家摊位信息 */
    MarketEvent.MARKET_PLAYER_INFO_EVENT = "MARKET_PLAYER_INFO_EVENT";
    /**更新列表 */
    MarketEvent.MARKET_UPD_LIST_EVENT = "MARKET_UPD_LIST_EVENT";
    //记录
    MarketEvent.MARKET_QUERY_NOTICE_EVENT = "MARKET_QUERY_NOTICE_EVENT";
    /**购买 */
    MarketEvent.MARKET_BUY_EVENT = "MARKET_BUY_EVENT";
    return MarketEvent;
}(BaseEvent));
__reflect(MarketEvent.prototype, "MarketEvent");
//# sourceMappingURL=MarketEvent.js.map