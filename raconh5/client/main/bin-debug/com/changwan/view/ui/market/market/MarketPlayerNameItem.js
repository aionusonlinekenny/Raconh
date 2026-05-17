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
 * 市场吊牌
 * pzx
 * create 2018-4-11
 */
var MarketPlayerNameItem = (function (_super) {
    __extends(MarketPlayerNameItem, _super);
    function MarketPlayerNameItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketPlayerNameItemSkin");
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    MarketPlayerNameItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MarketPlayerNameItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var info = this.data;
        this._name.text = info.name;
        this.setSelect(info.isClick);
    };
    MarketPlayerNameItem.prototype.setSelect = function (boo) {
        if (boo) {
            this._di1Img.visible = true;
            this._di2Img.visible = false;
            this._name.y = 100;
        }
        else {
            this._di1Img.visible = false;
            this._di2Img.visible = true;
            this._name.y = 60;
        }
        this.data.isClick = boo;
    };
    MarketPlayerNameItem.prototype.dispose = function () {
        ObjectUtil.removes(this._di1Img, this._di2Img);
        this._name.dispose();
        this._di1Img = null;
        this._di2Img = null;
        this._name = null;
    };
    return MarketPlayerNameItem;
}(ItemRenderer));
__reflect(MarketPlayerNameItem.prototype, "MarketPlayerNameItem");
//# sourceMappingURL=MarketPlayerNameItem.js.map