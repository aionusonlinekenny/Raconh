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
 * 2017.11.27
 * 提示
 */
var TextTips = /** @class */ (function (_super) {
    __extends(TextTips, _super);
    function TextTips() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("common", "TextTipsSkin");
        return _this;
    }
    TextTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    /**
     * @param textContent 提示内容
    */
    TextTips.prototype.show = function (textContent) {
        this._textContent = textContent;
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    };
    TextTips.prototype.hide = function () {
        this.dispose();
    };
    TextTips.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    TextTips.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    TextTips.prototype.drawData = function () {
        HtmlUtil.setTextFlow(this._content, this._textContent);
        this._content.height = this._content.textHeight;
        this._back.height = this._content.height + 85;
    };
    TextTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    TextTips.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    TextTips.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    TextTips.prototype.onClickHandler = function (e) {
        Manager.view.hide(109 /* TextTips */);
    };
    TextTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._btnClose);
        ObjectUtil.disposes(this._title, this._content);
        this._back = null;
        this._title = null;
        this._content = null;
        this._btnClose = null;
    };
    return TextTips;
}(UIComponent));
//# sourceMappingURL=TextTips.js.map