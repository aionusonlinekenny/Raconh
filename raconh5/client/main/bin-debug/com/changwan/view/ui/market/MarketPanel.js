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
 * 市场
 * 2018.4.10
 */
var MarketPanel = (function (_super) {
    __extends(MarketPanel, _super);
    function MarketPanel() {
        return _super.call(this, false) || this;
    }
    MarketPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "market_tanweitb_png", imgClick: "market_tanweitb_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "market_shangjiatb_png", imgClick: "market_shangjiatb_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = -2;
        this.basePanel.setBottomBackTop(1280);
    };
    MarketPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    MarketPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    MarketPanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    MarketPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        if (this._bit) {
            Manager.pool.push(this._bit);
            this._bit = null;
        }
        switch (index) {
            case 0:
                this._view = new MarketView();
                this._bit = Manager.pool.create(BitmapRemote);
                this._bit.y = 116;
                this._bit.x = 5;
                this._bit.load(Manager.path.getPanelUiImgPath("market/market_di2", "jpg"));
                break;
            case 1:
                this._view = new MarketSaleView();
                this._bit = Manager.pool.create(BitmapRemote);
                this._bit.y = 116;
                this._bit.x = 0;
                this._bit.load(Manager.path.getPanelUiImgPath("market/market_di", "jpg"));
                break;
        }
        this.basePanel.title = "market_titel_" + index + "_png";
        if (this._view && !this._view.parent)
            this.addChild(this._view);
        this.basePanel.addChildAt(this._bit, 3);
    };
    MarketPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(144 /* MarketPanel */);
                break;
        }
    };
    MarketPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._view);
        if (this._view)
            this._view.dispose();
        this._view = null;
    };
    return MarketPanel;
}(Panel));
__reflect(MarketPanel.prototype, "MarketPanel");
//# sourceMappingURL=MarketPanel.js.map