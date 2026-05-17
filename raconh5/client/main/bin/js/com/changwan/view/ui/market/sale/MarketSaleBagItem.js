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
 * 市场背包
 * pzx
 * create 2018-4-12
 */
var MarketSaleBagItem = /** @class */ (function (_super) {
    __extends(MarketSaleBagItem, _super);
    function MarketSaleBagItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketSaleBagItemSkin");
        return _this;
    }
    MarketSaleBagItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (!this._list) {
            this._list = [];
            for (var i = 0; i < 5; i++) {
                var item = Manager.pool.create(MarketSaleGoods);
                item.x = 130 * i + 24;
                item.y = -5;
                this.addChild(item);
                this._list.push(item);
            }
        }
    };
    MarketSaleBagItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var arr = this.data;
        for (var i = 0; i < 5; i++) {
            if (arr[i]) {
                this._list[i].data = arr[i];
            }
            else {
                this._list[i].clear();
            }
        }
    };
    MarketSaleBagItem.prototype.dispose = function () {
        if (this._list) {
            this._list.forEach(function (item, i) {
                item.dispose();
            });
            this._list = null;
        }
    };
    return MarketSaleBagItem;
}(ItemRenderer));
//# sourceMappingURL=MarketSaleBagItem.js.map