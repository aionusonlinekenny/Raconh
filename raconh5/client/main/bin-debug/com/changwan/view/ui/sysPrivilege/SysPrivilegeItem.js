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
var SysPrivilegeItem = (function (_super) {
    __extends(SysPrivilegeItem, _super);
    function SysPrivilegeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("sysprivilege", "SysPrivilegeItemSkin");
        return _this;
    }
    SysPrivilegeItem.prototype.setId = function (value) {
        this._id = value;
    };
    SysPrivilegeItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SysPrivilegeItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    SysPrivilegeItem.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    SysPrivilegeItem.prototype.drawData = function () {
        if (this._data == null)
            return;
        var png = "_png";
        if (this._id == 2) {
            this._titleImg.source = this._data.item2_titleImg;
            this._itemImg.source = this._data.item2_itemImg;
            if (this._data.id == 1) {
                this._itemImg.y = (this.height - 79) / 2;
                this._itemImg.x = 135;
            }
            else {
                this._itemImg.y = -6;
                this._itemImg.x = 178;
            }
        }
        else {
            this._itemImg.source = "sysprivilege_item" + this._id + png;
            this._titleImg.source = "sysprivilege_title" + this._id + png;
        }
        this._desImg.source = "sysprivilege_desc" + this._data.id + "_" + this._id + png;
    };
    SysPrivilegeItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    SysPrivilegeItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    SysPrivilegeItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._itemImg, this._titleImg, this._desImg);
        }
        this._itemImg = null;
        this._titleImg = null;
        this._desImg = null;
        this._data = null;
    };
    SysPrivilegeItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return SysPrivilegeItem;
}(UIComponent));
__reflect(SysPrivilegeItem.prototype, "SysPrivilegeItem");
//# sourceMappingURL=SysPrivilegeItem.js.map