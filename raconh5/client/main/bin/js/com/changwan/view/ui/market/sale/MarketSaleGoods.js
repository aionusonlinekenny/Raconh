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
 * 市场背包格子
 * pzx
 * create 2018-4-16
 */
var MarketSaleGoods = /** @class */ (function (_super) {
    __extends(MarketSaleGoods, _super);
    function MarketSaleGoods() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarketSaleGoods.prototype.clickFun = function (e) {
        if (this._data) {
            Manager.view.show(149 /* MarketSaleTipsView */, this._data);
        }
    };
    return MarketSaleGoods;
}(Goods));
//# sourceMappingURL=MarketSaleGoods.js.map