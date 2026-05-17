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
 * 17.12.18
 */
var CashCowEvent = (function (_super) {
    __extends(CashCowEvent, _super);
    function CashCowEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    CashCowEvent.CASHCOW_UPDATE_EVENT = "CASHCOW_UPDATE_EVENT";
    /** 冲级好礼更新 */
    CashCowEvent.LEVITEM_UPDATE_EVENT = "LEVITEM_UPDATE_EVENT";
    /** 冲级好礼查询 */
    CashCowEvent.LEVITEM_QUERY_EVENT = "LEVITEM_QUERY_EVENT";
    /** 七天登陆 */
    CashCowEvent.SEVENDAYS_QUERY_EVENT = "SEVENDAYS_QUERY_EVENT";
    /**七天登陆领奖 */
    CashCowEvent.SEVENDAYS_REWARD_EVENT = "SEVENDAYS_REWARD_EVENT";
    return CashCowEvent;
}(BaseEvent));
__reflect(CashCowEvent.prototype, "CashCowEvent");
//# sourceMappingURL=CashCowEvent.js.map