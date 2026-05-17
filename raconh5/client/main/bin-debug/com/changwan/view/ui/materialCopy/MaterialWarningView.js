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
 * 缥缈录警告提示
 */
var MaterialWarningView = (function (_super) {
    __extends(MaterialWarningView, _super);
    function MaterialWarningView() {
        var _this = _super.call(this) || this;
        _this.start();
        _this.addEvent();
        return _this;
    }
    MaterialWarningView.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 455;
        this.height = 62;
        this._img = Manager.pool.create(BitmapRemote);
        this.addChild(this._img);
        this._img.load(PathInfo.getPath("res/material/material_warning.png", LoaderType.IMAGE));
        this.onResizeHandler();
    };
    MaterialWarningView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    MaterialWarningView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MaterialWarningView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
        this.y = Manager.config.gameHeight - 350;
    };
    MaterialWarningView.prototype.show = function (time) {
        if (time == 0)
            Manager.view.hide(152 /* MaterialWarningView */);
        else {
            if (!this.parent)
                Manager.layer.tipsLayer.addChild(this);
            Manager.render.add(this.onTimeoutHandler, this, time, 0, null, true);
        }
    };
    MaterialWarningView.prototype.onTimeoutHandler = function () {
        Manager.render.remove(this.onTimeoutHandler, this);
        Manager.view.hide(152 /* MaterialWarningView */);
    };
    MaterialWarningView.prototype.hide = function () {
        this.disposeSelf();
    };
    MaterialWarningView.prototype.disposeSelf = function () {
        if (Manager.render.contains(this.onTimeoutHandler, this))
            Manager.render.remove(this.onTimeoutHandler, this);
        _super.prototype.disposeSelf.call(this);
        ObjectUtil.remove(this._img);
        if (this._img)
            Manager.pool.push(this._img);
        this._img = null;
    };
    return MaterialWarningView;
}(RenderSprite));
__reflect(MaterialWarningView.prototype, "MaterialWarningView");
//# sourceMappingURL=MaterialWarningView.js.map