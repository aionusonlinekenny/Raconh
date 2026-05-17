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
 *author Anydo
 *create 2017-12-20
 *description
*/
var OfflineProfitView = (function (_super) {
    __extends(OfflineProfitView, _super);
    function OfflineProfitView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("offlineProfit", "OfflineProfitViewSkin");
        return _this;
    }
    OfflineProfitView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.bgHeight = 555;
        this._groupBack.alpha = 0.4;
        this._groupPic.touchEnabled = this._groupPic.touchChildren = false;
        this._groupBack.touchEnabled = this._groupBack.touchChildren = false;
    };
    OfflineProfitView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    OfflineProfitView.prototype.removeEvent = function () {
        this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    OfflineProfitView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    OfflineProfitView.prototype.onCloseHandler = function (e) {
        Manager.view.hide(50 /* OfflineProfitView */);
    };
    OfflineProfitView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
        var time = args[0];
        var exp = args[1];
        var coin = args[2];
        var zbCount = args[3];
        var rlCount = args[4];
        var qhsCount = args[5];
        this._txt1.text = LangCVO.getContent("offlineProfit1", Math.floor(time / 60), Math.floor(time % 60));
        this._txt2.text = LangCVO.getContent("offlineProfit2", Math.floor(time / 60), Math.floor(time % 60));
        if (exp >= 100000000)
            this._txt3.text = ((exp / 100000000).toFixed(2) + LangCVO.getContent("offlineProfit3"));
        else if (exp >= 10000)
            this._txt3.text = ((exp / 10000).toFixed(2) + LangCVO.getContent("offlineProfit4"));
        else
            this._txt3.text = String(exp);
        var color1 = Manager.model.getSysPrivilege().getdata2(SysprivilegeType.GOLD_CARD).isActive ? Color.PURPLE : Color.GRAY;
        var color2 = Manager.model.getSysPrivilege().getdata2(SysprivilegeType.DIAMOND_CARD).isActive ? Color.ORANGE : Color.GRAY;
        this._txt4.textColor = color1;
        this._txt4.text = LangCVO.getContent("offlineProfit5");
        this._txt5.textColor = color2;
        this._txt5.text = LangCVO.getContent("offlineProfit6");
        if (coin >= 100000000)
            this._txt6.text = ((coin / 100000000).toFixed(2) + LangCVO.getContent("offlineProfit3"));
        else if (coin >= 10000)
            this._txt6.text = ((coin / 10000).toFixed(2) + LangCVO.getContent("offlineProfit4"));
        else
            this._txt6.text = String(coin);
        this._txt7.textColor = color1;
        this._txt7.text = LangCVO.getContent("offlineProfit5");
        this._txt8.textColor = color2;
        this._txt8.text = LangCVO.getContent("offlineProfit6");
        this._txt9.text = LangCVO.getContent("offlineProfit7") + zbCount;
        this._txt10.text = LangCVO.getContent("offlineProfit8") + rlCount;
        this._txt11.text = LangCVO.getContent("offlineProfit9") + qhsCount;
    };
    OfflineProfitView.prototype.hide = function () {
        this.dispose();
    };
    OfflineProfitView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._popupView.dispose();
            this._popupView = null;
            this._btnOk.dispose();
            this._btnOk = null;
            for (var i = 1; i <= 11; i++) {
                this["_txt" + i].dispose();
                this["_txt" + i] = null;
            }
        }
    };
    return OfflineProfitView;
}(UIComponent));
__reflect(OfflineProfitView.prototype, "OfflineProfitView");
//# sourceMappingURL=OfflineProfitView.js.map