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
 * 斗地主胜利界面
 */
var LandlordResultWin = (function (_super) {
    __extends(LandlordResultWin, _super);
    function LandlordResultWin() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordResultWinSkin");
        return _this;
    }
    LandlordResultWin.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        HtmlUtil.setTextFlow(this._content, Manager.model.getLaird().resultContent);
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
        this.onResizeHandler(null);
    };
    LandlordResultWin.prototype.countDown = function () {
        var left = this.leftTime;
        if (left == 0) {
            this.onClickHandler(null);
            return;
        }
        this._base.setTxt(LangCVO.getContent("activity2", left));
    };
    Object.defineProperty(LandlordResultWin.prototype, "leftTime", {
        get: function () {
            var left = Math.floor((this._endTime - egret.getTimer()) / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    LandlordResultWin.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._base.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LandlordResultWin.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._base.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LandlordResultWin.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
    };
    LandlordResultWin.prototype.onClickHandler = function (e) {
        Manager.render.remove(this.countDown, this);
        Manager.control.getLaird().lairdQuit();
        Manager.view.hide(89 /* LandlordResultWin */);
        Manager.model.getArena().exitArenaHandler();
        Manager.control.getLaird().lairdGuildInfo();
        Manager.control.getLaird().lairdCatch();
    };
    LandlordResultWin.prototype.show = function (countDownTime) {
        if (countDownTime === void 0) { countDownTime = 3; }
        Manager.layer.tipsLayer.addChild(this);
        this._endTime = egret.getTimer() + countDownTime * 1000;
    };
    LandlordResultWin.prototype.hide = function () {
        this.dispose();
    };
    LandlordResultWin.prototype.dispose = function () {
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        if (this._content)
            this._content.dispose();
        this._content = null;
        if (this._base)
            this._base.dispose();
        this._base = null;
    };
    return LandlordResultWin;
}(UIComponent));
__reflect(LandlordResultWin.prototype, "LandlordResultWin");
//# sourceMappingURL=LandlordResultWin.js.map