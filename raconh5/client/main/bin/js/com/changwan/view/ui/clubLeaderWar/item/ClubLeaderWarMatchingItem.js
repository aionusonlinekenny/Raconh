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
var ClubLeaderWarMatchingItem = /** @class */ (function (_super) {
    __extends(ClubLeaderWarMatchingItem, _super);
    function ClubLeaderWarMatchingItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarMatchingItemSkin");
        return _this;
    }
    Object.defineProperty(ClubLeaderWarMatchingItem.prototype, "dataIndex", {
        get: function () {
            return this._dataIndex;
        },
        /**数据列表顺序编号 */
        set: function (value) {
            this._dataIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    ClubLeaderWarMatchingItem.prototype.setValue = function (value) {
        this._name.text = value;
    };
    ClubLeaderWarMatchingItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._name);
        if (this._name)
            this._name.dispose();
        this._name = null;
    };
    return ClubLeaderWarMatchingItem;
}(UIComponent));
//# sourceMappingURL=ClubLeaderWarMatchingItem.js.map