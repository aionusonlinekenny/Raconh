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
 * 市场上架物品
 * pzx
 * create 2018-4-12
 */
var MarketSaleItem = (function (_super) {
    __extends(MarketSaleItem, _super);
    function MarketSaleItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketSaleItemSkin");
        return _this;
    }
    MarketSaleItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
    };
    MarketSaleItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    MarketSaleItem.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MarketSaleItem.prototype.onTouchHandler = function () {
        if (this._data) {
            Manager.view.show(151 /* MarketRecycleTipsView */, this._data);
        }
    };
    MarketSaleItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    MarketSaleItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    MarketSaleItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    MarketSaleItem.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    MarketSaleItem.prototype.drawData = function () {
        var cvo = this._data.cvo;
        this._nameTxt.text = cvo.name;
        this._numTxt.text = this._data.price * this._data.quantity + "";
        this._item.baseId = cvo.id;
        if (this._data.quantity > 1)
            this._item.count = this._data.quantity;
        this._icon.visible = true;
    };
    MarketSaleItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    MarketSaleItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    MarketSaleItem.prototype.clear = function () {
        this._nameTxt.text = "";
        this._numTxt.text = "";
        this._item.clear();
        this._icon.visible = false;
    };
    MarketSaleItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._nameTxt, this._numTxt);
        Manager.pool.push(this._item);
        this.removeChild(this._icon);
        this._nameTxt = null;
        this._numTxt = null;
        this._item = null;
        this._data = null;
        this._icon = null;
    };
    return MarketSaleItem;
}(UIComponent));
__reflect(MarketSaleItem.prototype, "MarketSaleItem");
//# sourceMappingURL=MarketSaleItem.js.map