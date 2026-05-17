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
 * 后台公告视图
 * liangyan
 * create 2017-11-14
*/
var BackgroundNoticeView = (function (_super) {
    __extends(BackgroundNoticeView, _super);
    function BackgroundNoticeView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("chat", "BackgroundNoticeSkin");
        _this.touchChildren = true;
        return _this;
    }
    BackgroundNoticeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    BackgroundNoticeView.prototype.removeEvent = function () {
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    BackgroundNoticeView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    BackgroundNoticeView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    BackgroundNoticeView.prototype.drawData = function () {
        this._txt.text = this._content;
    };
    BackgroundNoticeView.prototype.onTouchHandler = function (e) {
        Manager.view.hide(0 /* BackgroundNoticeView */);
    };
    BackgroundNoticeView.prototype.show = function (content) {
        this._content = content;
        if (!this.parent)
            Manager.layer.uiLayer.addChild(this);
    };
    BackgroundNoticeView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    BackgroundNoticeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._txt.dispose();
        this._closeBtn.dispose();
        this._txt = null;
        this._closeBtn = null;
    };
    return BackgroundNoticeView;
}(UIComponent));
__reflect(BackgroundNoticeView.prototype, "BackgroundNoticeView", ["IViewManager"]);
//# sourceMappingURL=BackgroundNoticeView.js.map