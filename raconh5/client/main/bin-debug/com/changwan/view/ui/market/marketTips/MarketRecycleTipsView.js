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
 * pzx
 * 17.14.16
 * 市场下架iew
 */
var MarketRecycleTipsView = (function (_super) {
    __extends(MarketRecycleTipsView, _super);
    function MarketRecycleTipsView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market/tips", "MarketRecycleTipsViewSkin");
        return _this;
    }
    MarketRecycleTipsView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this._goods.touchEnabled = false;
        this._goods.clear();
        this._nameTxt.stroke = 2;
        this._nameTxt.strokeColor = 0x7C6E62;
        this._popupView.titleImg.source = "market_nosale_png";
        this._popupView.bgHeight = 670;
        this._popupView.diImgVisible = false;
        this._popupView.viewY = 300;
    };
    MarketRecycleTipsView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._data) {
            this.updateView();
        }
    };
    MarketRecycleTipsView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.updateView();
    };
    MarketRecycleTipsView.prototype.updateView = function () {
        this._goods.baseId = this._data.base_id;
        HtmlUtil.setTextFlow(this._nameTxt, HtmlUtil.addColorTag(this._data.cvo.name, this._data.cvo.colorStr));
        this._numTxt.text = this._data.quantity + "";
        this._goldTxt.text = this._data.quantity * this._data.price + "";
        this._priceTxt.text = this._data.price + "";
    };
    MarketRecycleTipsView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    MarketRecycleTipsView.prototype.removeEvent = function () {
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MarketRecycleTipsView.prototype.onTouchHandler = function () {
        Manager.control.getmarket().onsale(this._data.pos);
        this.onTouchCloseHandler();
    };
    MarketRecycleTipsView.prototype.onTouchCloseHandler = function () {
        Manager.view.hide(151 /* MarketRecycleTipsView */);
    };
    MarketRecycleTipsView.prototype.clear = function () {
        this._goods.clear();
        this._count = 1;
        this._price = 0;
        this._numTxt.text = "";
        this._data = null;
        this._nameTxt.text = "";
    };
    MarketRecycleTipsView.prototype.show = function (info) {
        this._data = info;
        Manager.layer.tipsLayer.addChild(this);
    };
    MarketRecycleTipsView.prototype.hide = function () {
        this.dispose();
    };
    MarketRecycleTipsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._numTxt, this._buyBtn, this._nameTxt, this._goldTxt, this._priceTxt);
        Manager.pool.push(this._goods);
        this._numTxt = null;
        this._buyBtn = null;
        this._goods = null;
        this._nameTxt = null;
        this._goldTxt = null;
        this._priceTxt = null;
        this._data = null;
    };
    return MarketRecycleTipsView;
}(PopUpView));
__reflect(MarketRecycleTipsView.prototype, "MarketRecycleTipsView");
//# sourceMappingURL=MarketRecycleTipsView.js.map