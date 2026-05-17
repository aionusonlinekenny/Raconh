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
 * 盟会战说明界面
 * luzh
 * 2018.1.29
 */
var ClubBFExplainView = /** @class */ (function (_super) {
    __extends(ClubBFExplainView, _super);
    function ClubBFExplainView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubBF", "ClubBFExplainSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubBFExplainView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF1"));
        HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF2"));
        HtmlUtil.setTextFlow(this._txt2, LangCVO.getContent("clubBF3"));
        HtmlUtil.setTextFlow(this._txt3, LangCVO.getContent("clubBF4"));
        this._line0.y = this._txt0.y + this._txt0.height + 15;
        this._line1.y = this._txt1.y + this._txt1.height + 15;
        this._line2.y = this._txt2.y + this._txt2.height + 15;
        this._group1.y = this._group0.y + this._group0.height + 5;
        this._group2.y = this._group1.y + this._group1.height + 5;
        this._group3.y = this._group2.y + this._group2.height + 5;
        this._btn.y = this._group3.y + this._group3.height + 28;
        this._basePopView.viewY = 135;
        this._basePopView.bgHeight = this._group3.y + this._group3.height;
        this.onResizeHandler(null);
    };
    ClubBFExplainView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubBFExplainView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubBFExplainView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.config.gameWidth - this.width) / 2);
    };
    ClubBFExplainView.prototype.onClickHandler = function (e) {
        Manager.view.hide(94 /* ClubBFExplainView */);
    };
    ClubBFExplainView.prototype.show = function () {
        if (this.parent == null)
            Manager.layer.tipsLayer.addChild(this);
    };
    ClubBFExplainView.prototype.hide = function () {
        this.dispose();
    };
    ClubBFExplainView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._group0, this._group1, this._group2, this._group3, this._line0, this._line1, this._line2);
        ObjectUtil.disposes(this._basePopView, this._txt0, this._txt1, this._txt2, this._txt3, this._btn);
        this._basePopView = null;
        this._group0 = null;
        this._group1 = null;
        this._group2 = null;
        this._group3 = null;
        this._txt0 = null;
        this._txt1 = null;
        this._txt2 = null;
        this._txt3 = null;
        this._line0 = null;
        this._line1 = null;
        this._line2 = null;
        this._btn = null;
    };
    return ClubBFExplainView;
}(UIComponent));
//# sourceMappingURL=ClubBFExplainView.js.map