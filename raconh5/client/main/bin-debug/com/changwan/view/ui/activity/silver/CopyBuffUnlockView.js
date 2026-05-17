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
 * 银币副本buff解锁界面
 * luzhihong
 * create 2018.1.19
 */
var CopyBuffUnlockView = (function (_super) {
    __extends(CopyBuffUnlockView, _super);
    function CopyBuffUnlockView() {
        var _this = _super.call(this) || this;
        _this._lastClickTime = 0;
        _this.skinName = Manager.path.getSkinName("activity", "CopyBuffUnlockViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopyBuffUnlockView.prototype.show = function (left, totalTime) {
        this._endTime = left + egret.getTimer() / 1000;
        this._totalTime = totalTime;
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChildAt(this, 0);
            this.onResizeHandler(null);
        }
    };
    CopyBuffUnlockView.prototype.hide = function () {
        this.dispose();
    };
    CopyBuffUnlockView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._coolingImg = new CoolingImage(50);
        this._coolingImg.x = this._btn.x + 55;
        this._coolingImg.y = this._btn.y + 55;
        this.addChildAt(this._coolingImg, 0);
        Manager.render.add(this.countDown, this, 200);
        this.countDown();
    };
    CopyBuffUnlockView.prototype.countDown = function () {
        var left = this._endTime - egret.getTimer() / 1000;
        if (left > 0)
            this._coolingImg.setSchedule(this._totalTime - left, this._totalTime);
        else
            Manager.view.hide(85 /* CopyBuffUnlockView */);
    };
    CopyBuffUnlockView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopyBuffUnlockView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CopyBuffUnlockView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.config.gameWidth - this.width) >> 1);
        this.y = Math.round((Manager.config.gameHeight - this.height) >> 1);
    };
    CopyBuffUnlockView.prototype.onClickHandler = function (e) {
        if (egret.getTimer() - this._lastClickTime < 200)
            return;
        this._lastClickTime = egret.getTimer();
        Manager.control.getCopy().buffUnlock();
        Manager.view.hide(72 /* CopyExpResultView */);
    };
    CopyBuffUnlockView.prototype.dispose = function () {
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._btn);
        ObjectUtil.dispose(this._coolingImg);
        this._btn = null;
        this._coolingImg = null;
    };
    return CopyBuffUnlockView;
}(UIComponent));
__reflect(CopyBuffUnlockView.prototype, "CopyBuffUnlockView", ["IViewManager"]);
//# sourceMappingURL=CopyBuffUnlockView.js.map