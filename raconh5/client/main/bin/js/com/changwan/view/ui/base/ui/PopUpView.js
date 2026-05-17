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
 * 二级界面
 * 17.12.26
 */
var PopUpView = /** @class */ (function (_super) {
    __extends(PopUpView, _super);
    function PopUpView() {
        var _this = _super.call(this) || this;
        _this.visible = false;
        _this.touchChildren = true;
        return _this;
    }
    PopUpView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.onResizeHandler(null);
    };
    PopUpView.prototype.addEvent = function () {
        this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.addEvent.call(this);
    };
    PopUpView.prototype.removeEvent = function () {
        this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    PopUpView.prototype.onTouchCloseHandler = function (e) {
    };
    PopUpView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if (!this.visible)
            this.visible = true;
    };
    PopUpView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Manager.layer.tipsLayer.addChild(this);
    };
    PopUpView.prototype.hide = function () {
        this.dispose();
    };
    PopUpView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._popupView.dispose();
        this._popupView = null;
    };
    return PopUpView;
}(UIComponent));
//# sourceMappingURL=PopUpView.js.map