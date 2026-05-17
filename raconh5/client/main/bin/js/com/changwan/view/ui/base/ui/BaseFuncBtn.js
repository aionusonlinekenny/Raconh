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
var BaseFuncBtn = /** @class */ (function (_super) {
    __extends(BaseFuncBtn, _super);
    function BaseFuncBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("common", "BaseFuncBtnSkin");
        if (!_this._changeEffect) {
            _this._changeEffect = Manager.animation.createEffectAnimation("funcChange");
            _this._changeEffect.width = 258;
            _this._changeEffect.height = 258;
            _this._changeEffect.x = -76;
            _this._changeEffect.y = -60;
        }
        if (!_this._changeEffect.parent)
            _this._effect.addChild(_this._changeEffect);
        _this._changeEffect.visible = false;
        return _this;
    }
    BaseFuncBtn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameDispatcher.getInstance().dispatchEventWith(BaseUIEvent.ITEM_RENDERER_COMPLETE, false, BaseFuncBtn); //这里如以后有扩展可再修改
    };
    BaseFuncBtn.prototype.setIconShow = function (boo) {
        if (this.data) {
            if (boo)
                this.data.showRedIcon = true;
            else
                delete this.data.showRedIcon;
        }
        if (this._loadCompltet) {
            this._redIcon.visible = boo;
            return;
        }
    };
    BaseFuncBtn.prototype.dataChanged = function () {
        this._changeEffect.visible = this.data.isSelected;
        this._redIcon.visible = this.data.showRedIcon;
    };
    Object.defineProperty(BaseFuncBtn.prototype, "isSelected", {
        set: function (value) {
            this._changeEffect.visible = this.data.isSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseFuncBtn.prototype.dispose = function () {
        if (this._effect && this._effect.parent)
            this._effect.parent.removeChild(this._effect);
        this._effect = null;
        if (this._redIcon && this._redIcon.parent)
            this._redIcon.parent.removeChild(this._redIcon);
        this._redIcon = null;
        if (this._changeEffect)
            Manager.pool.push(this._changeEffect);
        this._changeEffect = null;
        _super.prototype.dispose.call(this);
    };
    return BaseFuncBtn;
}(ItemRenderer));
//# sourceMappingURL=BaseFuncBtn.js.map