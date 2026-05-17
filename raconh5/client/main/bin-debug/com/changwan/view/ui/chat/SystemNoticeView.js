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
 * 系统公告
 * liangyan
 * create 2017-11-14
*/
var SystemNoticeView = (function (_super) {
    __extends(SystemNoticeView, _super);
    function SystemNoticeView() {
        var _this = _super.call(this) || this;
        _this.TXT_X = 456;
        _this.skinName = Manager.path.getSkinName("chat", "SystemNoticeSkin");
        return _this;
    }
    Object.defineProperty(SystemNoticeView, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new SystemNoticeView();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SystemNoticeView.nullInstance = function () { this._instance = null; };
    SystemNoticeView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.mask = new egret.Rectangle(43, 0, 413, 44);
        this.onResizeHandler(null);
    };
    SystemNoticeView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    SystemNoticeView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SystemNoticeView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SystemNoticeView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    SystemNoticeView.prototype.drawData = function () {
        egret.Tween.removeTweens(this._txt);
        HtmlUtil.setTextFlow(this._txt, this._content);
        this._txt.x = 456;
        var duration = this._txt.width * 25;
        egret.Tween.get(this._txt).to({ x: 43 - this._txt.width }, duration).wait(200).call(this.hide, this);
    };
    SystemNoticeView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = 300;
    };
    SystemNoticeView.prototype.show = function (content) {
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChild(this);
        }
        this._content = content;
        this.invalidate(InvalidationType.DATA);
    };
    SystemNoticeView.prototype.hide = function () {
        if (this.parent != null)
            this.dispose();
    };
    SystemNoticeView.prototype.dispose = function () {
        SystemNoticeView.nullInstance();
        egret.Tween.removeTweens(this._txt);
        _super.prototype.dispose.call(this);
        this._txt.dispose();
        this._txt = null;
        this.mask = null;
    };
    return SystemNoticeView;
}(UIComponent));
__reflect(SystemNoticeView.prototype, "SystemNoticeView");
//# sourceMappingURL=SystemNoticeView.js.map