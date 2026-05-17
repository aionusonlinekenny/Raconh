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
var SuitAttrList = (function (_super) {
    __extends(SuitAttrList, _super);
    function SuitAttrList() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("equip", "SuitAttrListSkin");
        return _this;
    }
    SuitAttrList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._attr.multiline = true;
        this._attr.wordWrap = true;
        this._attr.lineSpacing = 8;
    };
    SuitAttrList.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._attr = null;
    };
    return SuitAttrList;
}(ItemRenderer));
__reflect(SuitAttrList.prototype, "SuitAttrList");
//# sourceMappingURL=SuitAttrList.js.map