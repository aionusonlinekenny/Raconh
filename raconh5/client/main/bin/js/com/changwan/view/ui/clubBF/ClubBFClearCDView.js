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
 * 盟会战清除CD界面
 * luzh
 * 2018.1.29
 */
var ClubBFClearCDView = /** @class */ (function (_super) {
    __extends(ClubBFClearCDView, _super);
    function ClubBFClearCDView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFClearCDSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubBFClearCDView.prototype.show = function () {
        if (this.parent == null)
            Manager.layer.tipsLayer.addChildAt(this, 0);
    };
    ClubBFClearCDView.prototype.hide = function () {
        this.dispose();
    };
    ClubBFClearCDView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("clubBF6", ClubBFConfigCVO.clear_cd_cost.num)); //确定花费      {0}清除CD吗？
        this.onResizeHandler(null);
    };
    ClubBFClearCDView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._checkBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ClubBFClearCDView.prototype.removeEvent = function () {
        this._checkBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubBFClearCDView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.config.gameWidth - this.width) >> 1);
        this.y = 351;
    };
    ClubBFClearCDView.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._checkBox:
                Manager.model.getClubBF().cdClearNotAlert = this._checkBox.selected;
                return;
            case this._btnConfirm:
                Manager.control.getClubBF().clearCD();
                break;
        }
        Manager.view.hide(95 /* ClubBFClearCDView */);
    };
    ClubBFClearCDView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._txt, this._checkBox, this._btnConfirm, this._btnCancel);
        ObjectUtil.remove(this._btnClose);
        this._txt = null;
        this._checkBox = null;
        this._btnConfirm = null;
        this._btnCancel = null;
        this._btnClose = null;
    };
    return ClubBFClearCDView;
}(UIComponent));
//# sourceMappingURL=ClubBFClearCDView.js.map