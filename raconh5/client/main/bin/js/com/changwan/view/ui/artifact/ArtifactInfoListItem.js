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
 * 个人寻宝信息
 * create 18.2.8
 */
var ArtifactInfoListItem = /** @class */ (function (_super) {
    __extends(ArtifactInfoListItem, _super);
    function ArtifactInfoListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("artifact", "ArtifactInfoListItemSkin");
        return _this;
    }
    ArtifactInfoListItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._label.lineSpacing = 5;
    };
    ArtifactInfoListItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var info = this.data;
        HtmlUtil.setTextFlow(this._label, info.desc());
        this.height = this._label.height + 10;
    };
    ArtifactInfoListItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._label.dispose();
        this._label = null;
    };
    return ArtifactInfoListItem;
}(ItemRenderer));
//# sourceMappingURL=ArtifactInfoListItem.js.map