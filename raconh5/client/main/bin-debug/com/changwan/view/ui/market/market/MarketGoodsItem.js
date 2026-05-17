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
 * 市场物品
 * pzx
 * create 2018-4-12
 */
var MarketGoodsItem = (function (_super) {
    __extends(MarketGoodsItem, _super);
    function MarketGoodsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketGoodsItemSkin");
        return _this;
    }
    MarketGoodsItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
    };
    MarketGoodsItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    MarketGoodsItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    MarketGoodsItem.prototype.onTouchHandler = function (e) {
        if (this._data) {
            Manager.view.show(150 /* MarketBuyTipsView */, this._data);
        }
    };
    MarketGoodsItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    MarketGoodsItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    MarketGoodsItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    MarketGoodsItem.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    MarketGoodsItem.prototype.drawData = function () {
        var cvo = this._data.cvo;
        this._itemBit.load(Manager.path.getIconPath(cvo.imgId));
        this._numTxt.text = this._data.price + "";
    };
    MarketGoodsItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    MarketGoodsItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    MarketGoodsItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.pool.push(this._itemBit);
        this._numTxt.dispose();
        this._itemBit = null;
        this._numTxt = null;
        this._data = null;
    };
    return MarketGoodsItem;
}(UIComponent));
__reflect(MarketGoodsItem.prototype, "MarketGoodsItem");
//# sourceMappingURL=MarketGoodsItem.js.map