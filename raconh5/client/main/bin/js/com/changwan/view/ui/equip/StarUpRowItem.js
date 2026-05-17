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
 * 升星 一行item
 * drq
 * create 2018-4-16
 */
var StarUpRowItem = /** @class */ (function (_super) {
    __extends(StarUpRowItem, _super);
    function StarUpRowItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("equip", "StarUpRowItemSkin");
        return _this;
    }
    StarUpRowItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (!this._list) {
            this._list = [];
            for (var i = 0; i < 4; i++) {
                var item = Manager.pool.create(StarUpMainItem);
                item.x = 141 * i + 24;
                item.y = -5;
                this.addChild(item);
                this._list.push(item);
            }
        }
    };
    StarUpRowItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var arr = this.data;
        for (var i = 0; i < 4; i++) {
            if (arr[i]) {
                this._list[i].setProperty(arr[i]);
            }
        }
    };
    StarUpRowItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
        }
    };
    StarUpRowItem.prototype.dispose = function () {
        this.clear(true);
        this._list = null;
    };
    return StarUpRowItem;
}(ItemRenderer));
//# sourceMappingURL=StarUpRowItem.js.map