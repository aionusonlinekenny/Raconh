var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * vip特权文本子项
 * liangyan
 * create 2017-12-26
*/
var VipRightItem = (function (_super) {
    __extends(VipRightItem, _super);
    function VipRightItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("vip", "VipRightItemSkin");
        return _this;
    }
    VipRightItem.prototype.dataChanged = function () {
        HtmlUtil.setTextFlow(this._txt, this.data.str);
        this._txt.width = this._txt.textWidth + 10;
        this._icon.x = this._txt.width + 50;
        this._icon.visible = this.data.isNew;
    };
    VipRightItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove)
            ObjectUtil.removes(this._txt, this._icon);
        this._txt.dispose();
        this._txt = null;
        this._icon.bitmapData = null;
        this._icon = null;
    };
    VipRightItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return VipRightItem;
}(ItemRenderer));
__reflect(VipRightItem.prototype, "VipRightItem");
//# sourceMappingURL=VipRightItem.js.map