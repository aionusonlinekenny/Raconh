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
 * 装备熔炼
 * Simon 2017.12.1
 */
var RongLianItem = /** @class */ (function (_super) {
    __extends(RongLianItem, _super);
    function RongLianItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("bag", "RonglianItemSkin");
        _this.initView();
        return _this;
    }
    RongLianItem.prototype.initView = function () {
        this._item = new EquipItem();
        this.addChild(this._item);
    };
    RongLianItem.prototype.dataChanged = function () {
        var info = this.data;
        if (info) {
            this._item.data = info;
            // this._item.baseId = info.base_id;
            // this._item.count = info.quantity;
            // this._item.bind = info.bind;
        }
    };
    return RongLianItem;
}(ItemRenderer));
//# sourceMappingURL=RongLianItem.js.map