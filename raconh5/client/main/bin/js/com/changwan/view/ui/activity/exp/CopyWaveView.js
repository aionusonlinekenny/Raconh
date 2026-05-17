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
 * 第几波视图
 * luzhihong
 * create 2018.1.11
 */
var CopyWaveView = /** @class */ (function (_super) {
    __extends(CopyWaveView, _super);
    function CopyWaveView() {
        var _this = _super.call(this) || this;
        _this._label = new eui.Image("copy_exp_label_wave_png");
        _this.addChild(_this._label);
        _this._numView = Manager.pool.create(NumImgView2);
        _this._numView.y = -12;
        _this.addChild(_this._numView);
        return _this;
    }
    CopyWaveView.prototype.show = function (wave) {
        this.reuse();
        this._numView.setValue(wave, "nums_countdown_", 28);
        this._numView.x = 52 - this._numView.width / 2;
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChild(this);
            this.y = 520;
            this.onResizeHandler(null);
        }
        egret.Tween.get(this).to({ alpha: 1 }, 500)
            .wait(1000)
            .to({ alpha: 0 }, 500)
            .call(this.hideView, this);
    };
    CopyWaveView.prototype.hideView = function () {
        Manager.view.hide(74 /* CopyWaveView */);
    };
    CopyWaveView.prototype.hide = function () {
        this.dispose();
    };
    CopyWaveView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CopyWaveView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CopyWaveView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 162) / 2;
    };
    CopyWaveView.prototype.reuse = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.reuse.call(this);
        this.alpha = 0;
        egret.Tween.removeTweens(this);
    };
    CopyWaveView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._label);
        ObjectUtil.dispose(this._numView);
        this._label = null;
        this._numView = null;
    };
    return CopyWaveView;
}(Sprite));
//# sourceMappingURL=CopyWaveView.js.map