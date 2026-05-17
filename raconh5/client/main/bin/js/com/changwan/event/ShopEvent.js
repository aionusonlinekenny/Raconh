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
 * 17.11.28
 */
var ShopEvent = /** @class */ (function (_super) {
    __extends(ShopEvent, _super);
    function ShopEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    ShopEvent.SHOP_UPDATE_EVENT = "SHOP_UPDATE_EVENT";
    //购买成功刷新
    ShopEvent.SHOP_BUY_EVENT = "SHOP_BUY_EVENT";
    ShopEvent.TREASUREGARRET_UPDATE_EVENT = "TREASUREGARRET_UPDATE_EVENT";
    return ShopEvent;
}(BaseEvent));
//# sourceMappingURL=ShopEvent.js.map