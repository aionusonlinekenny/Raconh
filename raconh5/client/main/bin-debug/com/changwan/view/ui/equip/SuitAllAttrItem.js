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
var SuitAllAttrItem = (function (_super) {
    __extends(SuitAllAttrItem, _super);
    function SuitAllAttrItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("equip", "SuitAllAttrItemSkin");
        return _this;
    }
    SuitAllAttrItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._attrValue.multiline = true;
        this._attrValue.wordWrap = true;
        this._attrValue.lineSpacing = 10;
    };
    SuitAllAttrItem.prototype.dataChanged = function () {
        if (this.data.index == 0)
            this._topLine.visible = false;
        HtmlUtil.setTextFlow(this._equipName, this.data.equipName);
        HtmlUtil.setTextFlow(this._attrValue, this.data.suitAttr);
    };
    SuitAllAttrItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._topLine = null;
        if (this._equipName)
            this._equipName.dispose();
        this._equipName = null;
        if (this._attrValue)
            this._attrValue.dispose();
        this._attrValue = null;
    };
    return SuitAllAttrItem;
}(ItemRenderer));
__reflect(SuitAllAttrItem.prototype, "SuitAllAttrItem");
//# sourceMappingURL=SuitAllAttrItem.js.map