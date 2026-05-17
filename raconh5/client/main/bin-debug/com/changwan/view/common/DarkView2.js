var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2018-4-20
 *description
*/
var DarkView2 = (function () {
    function DarkView2() {
    }
    DarkView2.prototype.reuse = function (isPanelDark) {
        this._isPanelDark = isPanelDark;
        this.initView();
        this.addEvent();
    };
    DarkView2.prototype.unuse = function () {
        this.dispose();
    };
    DarkView2.prototype.initView = function () {
        var url = this._isPanelDark ? "common_dark_bg_png" : "common_black_rect_png";
        var ww = Manager.global.gameMain.stage.$stageWidth;
        var hh = Manager.global.gameMain.stage.$stageHeight;
        this._back = BitmapRes.create(url, 0, 0, ww, hh);
        this._back.scale9Grid = new egret.Rectangle(2, 2, 16, 16);
        this._back.touchEnabled = !this._isPanelDark;
        if (this._isPanelDark)
            Manager.layer.panelDarkLayer.addChildAt(this._back, 0);
        else
            Manager.layer.modalImageLayer.addChildAt(this._back, 0);
    };
    DarkView2.prototype.addEvent = function () {
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    DarkView2.prototype.removeEvent = function () {
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    DarkView2.prototype.onResizeHandler = function (e) {
        this._back.width = Manager.global.gameMain.stage.$stageWidth;
        this._back.height = Manager.global.gameMain.stage.$stageHeight;
    };
    DarkView2.prototype.onClickHandler = function (e) {
        if (Manager.view.isOpening(20 /* BagEquipTips */))
            Manager.view.hide(20 /* BagEquipTips */);
        if (Manager.view.isOpening(45 /* EquipTips */))
            Manager.view.hide(45 /* EquipTips */);
        if (Manager.view.isOpening(9 /* ItemsTips */))
            Manager.view.hide(9 /* ItemsTips */);
    };
    DarkView2.prototype.setAlpha = function (value) {
        this._back.alpha = value;
    };
    DarkView2.prototype.dispose = function () {
        this.removeEvent();
        Manager.pool.push(this._back);
        this._back = null;
    };
    return DarkView2;
}());
__reflect(DarkView2.prototype, "DarkView2", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=DarkView2.js.map