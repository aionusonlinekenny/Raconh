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
 * 盟会战清除CD界面
 * luzh
 * 2018.1.29
 */
var ClubBFClearCDBtn = (function (_super) {
    __extends(ClubBFClearCDBtn, _super);
    function ClubBFClearCDBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFClearCDBtnSkin");
        _this.touchEnabled = true;
        return _this;
    }
    ClubBFClearCDBtn.prototype.show = function () {
        if (this.parent == null)
            Manager.layer.uiLayer.addChild(this);
    };
    ClubBFClearCDBtn.prototype.hide = function () {
        this.dispose();
    };
    ClubBFClearCDBtn.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getClubBF();
        this._cdView = Manager.pool.create(NumImgView2);
        this._cdView.x = 172;
        this._cdView.y = 1;
        this._cdView.scaleX = this._cdView.scaleY = 1.2;
        this._label.parent.addChild(this._cdView);
        this.onResizeHandler(null);
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
    };
    ClubBFClearCDBtn.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ClubBFClearCDBtn.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubBFClearCDBtn.prototype.onResizeHandler = function (e) {
        // this.x = Math.round((Manager.config.gameWidth - this.width)>>1);
        this.x = 158;
        this.y = 150;
    };
    ClubBFClearCDBtn.prototype.onClickHandler = function (e) {
        if (this._model.cdClearNotAlert)
            Manager.control.getClubBF().clearCD();
        else
            Manager.view.show(95 /* ClubBFClearCDView */);
    };
    ClubBFClearCDBtn.prototype.countDown = function () {
        var left = this._model.cd;
        if (left <= 0) {
            Manager.view.hide(101 /* ClubBFClearCDBtn */);
            Manager.view.hide(95 /* ClubBFClearCDView */);
            return;
        }
        this._cdView.setValue(left, "nums_count_", 0);
        this._label.x = this._cdView.x + this._cdView.width * 1.2 + 30;
    };
    ClubBFClearCDBtn.prototype.dispose = function () {
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._cdView);
        ObjectUtil.remove(this._label);
        this._cdView = null;
        this._label = null;
        Manager.view.hide(95 /* ClubBFClearCDView */);
        Manager.model.getClubBF().cdEndTime = 0;
    };
    return ClubBFClearCDBtn;
}(UIComponent));
__reflect(ClubBFClearCDBtn.prototype, "ClubBFClearCDBtn", ["IViewManager"]);
//# sourceMappingURL=ClubBFClearCDBtn.js.map