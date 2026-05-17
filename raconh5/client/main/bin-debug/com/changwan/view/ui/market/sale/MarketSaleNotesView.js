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
 *　销售记录
 * pzx
 * 2018.4.16
 */
var MarketSaleNotesView = (function (_super) {
    __extends(MarketSaleNotesView, _super);
    function MarketSaleNotesView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketSaleNotesViewSkin");
        return _this;
    }
    MarketSaleNotesView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.titleImg.source = "market_jiaoyijilutb_png";
        this._popupView.viewY = 250;
        this._popupView.bgHeight = 730;
        this._popupView.diImgVisible = false;
        this._scroller.initBtnListData(MarketSaleNotesItem, [], true);
        Manager.control.getmarket().noticeList();
    };
    MarketSaleNotesView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getmarketModel().addEventListener(MarketEvent.MARKET_QUERY_NOTICE_EVENT, this.darwData, this);
    };
    MarketSaleNotesView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getmarketModel().removeEventListener(MarketEvent.MARKET_QUERY_NOTICE_EVENT, this.darwData, this);
    };
    MarketSaleNotesView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(146 /* MarketSaleNotesView */);
    };
    MarketSaleNotesView.prototype.darwData = function () {
        this._scroller.dataProvider(Manager.model.getmarketModel().getnoticeList());
    };
    MarketSaleNotesView.prototype.show = function (value) {
        _super.prototype.show.call(this);
    };
    MarketSaleNotesView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._scroller.dispose();
        this._scroller = null;
    };
    return MarketSaleNotesView;
}(PopUpView));
__reflect(MarketSaleNotesView.prototype, "MarketSaleNotesView");
//# sourceMappingURL=MarketSaleNotesView.js.map