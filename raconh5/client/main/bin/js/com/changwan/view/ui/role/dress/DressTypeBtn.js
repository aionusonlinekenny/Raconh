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
 * 装扮类型按钮
 * liangyan
 * create 2017-11-28
*/
var DressTypeBtn = /** @class */ (function (_super) {
    __extends(DressTypeBtn, _super);
    function DressTypeBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("dress", "DressTypeBtnSkin");
        return _this;
    }
    DressTypeBtn.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this._redIcon.visible = this.data.redShow;
    };
    DressTypeBtn.prototype.showRedIcon = function (value) {
        this._redIcon.visible = value;
    };
    DressTypeBtn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameDispatcher.getInstance().dispatchEventWith(BaseUIEvent.ITEM_RENDERER_COMPLETE, false, DressTypeBtn);
    };
    DressTypeBtn.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeChild(this._redIcon);
        this._redIcon = null;
    };
    return DressTypeBtn;
}(ItemRenderer));
//# sourceMappingURL=DressTypeBtn.js.map