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
 *create 2017-12-28
 *description
*/
var ArenaDailyListItem = /** @class */ (function (_super) {
    __extends(ArenaDailyListItem, _super);
    function ArenaDailyListItem() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this.skinName = Manager.path.getSkinName("arena", "ArenaDailyListItemSkin");
        return _this;
    }
    ArenaDailyListItem.prototype.dataChanged = function () {
        this.disposeItems();
        var info = this.data;
        if (info == null)
            return;
        this._txt.text = info.des;
        this._goodItems = [];
        var goods = info.gains;
        var len = goods.length > 3 ? 3 : goods.length;
        var item;
        for (var i = 0; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 262 + i * 130;
            item.y = -5;
            item.data = goods[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }
    };
    ArenaDailyListItem.prototype.disposeItems = function () {
        for (var i = 0; i < this._goodItems.length; i++) {
            Manager.pool.push(this._goodItems[i]);
        }
        this._goodItems = null;
    };
    ArenaDailyListItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._txt.dispose();
        this._txt = null;
        this.disposeItems();
    };
    return ArenaDailyListItem;
}(ItemRenderer));
//# sourceMappingURL=ArenaDailyListItem.js.map